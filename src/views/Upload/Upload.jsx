import styled from "styled-components";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { uuidv4 } from "@firebase/util";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useAuth } from "../../context/authContext";
import {
  getSchool,
  getSubject,
  getUniversities,
  getUniversity,
  uploadFile,
} from "../../util/api";
import Select from "../../components/Select";
import Text from "../../components/Text";
import Img from "../../components/Img";
import Textarea from "../../components/Textarea";
import Fileinput from "../../components/Fileinput";
// import Checkbox from "../../components/Checkbox";
import { colors } from "../../config/theme";
import { useRouter } from "next/router";

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: ${(props) => props.margin || "0"};
`;

const TitleImg = styled(Img)`
  @media (max-width: 1200px) {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const TitleText = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const InputHeader = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const UploadForm = styled.div`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 3rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

const UploadBox = styled.div`
  margin: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  @media (max-width: 1000px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  & p {
    max-width: 100%;
    line-break: anywhere;
    flex: 1;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  margin: 0 auto;
`;

// const FileBox = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 20px;
//   margin: 0 0 5px 0;
// `;

export default function UploadView({ setState }) {
  const { user } = useAuth();
  const { push } = useRouter();

  const [file, setFile] = useState(null);
  const [error, setError] = useState({
    name: null,
    description: null,
    subject: null,
    file: null,
    price: null,
  });

  const [docData, setDocData] = useState({
    name: "",
    description: "",
    price: parseFloat(process.env.NEXT_PUBLIC_MIN_PRICE).toFixed(2),
    university: user.data.university,
    school: user.data.school,
    degree: user.data.degree,
    subject: null,
    validate: false,
  });

  const [data, setData] = useState({
    universities: null,
    schools: null,
    degrees: null,
    subjects: null,
  });

  const handleFileChange = ({ target }) => {
    setError((error) => ({ ...error, files: null }));
    setFile(target.files[0]);
  };

  const handleDataChange = ({ target }) => {
    setDocData((data) => ({ ...data, [target.name]: target.value }));
  };

  const handleSubjectChange = async ({ target }) => {
    if (target.name == "universities") {
      setDocData({
        ...docData,
        university: target.value,
        school: null,
        degree: null,
        subject: null,
      });

      setData({ ...data, schools: null, degrees: null, subjects: null });
      if (target.value == "") return;
      getUniversity(target.value).then((response) => {
        setData({
          ...data,
          schools: response.schools,
          degrees: null,
          subjects: null,
        });
      });
      // TODO: Handle api errors
      return;
    }

    if (target.name == "schools") {
      if (!target.value) {
        setDocData((docData) => ({
          ...docData,
          school: null,
          degree: null,
          subject: null,
        }));

        setData((data) => ({ ...data, degrees: null, subjects: null }));
        return;
      }

      setDocData({
        ...docData,
        school: target.value,
        degree: null,
        subject: null,
      });
      setData({ ...data, degrees: null, subjects: null });
      getSchool(docData.university, target.value).then((response) => {
        setData({ ...data, degrees: response.degrees, subjects: null });
      });
      // TODO: Handle api errors
      return;
    }

    if (target.name == "degrees") {
      if (!target.value) {
        setDocData((docData) => ({
          ...docData,
          degree: null,
          subject: null,
        }));

        setData((data) => ({ ...data, subjects: null }));
        return;
      }

      setDocData({ ...docData, degree: target.value, subject: null });
      const degree = data.degrees.filter((item) => item.id === target.value)[0];
      const subjects = degree.subjects.sort((a, b) =>
        a.code.toString().localeCompare(b.code.toString())
      );
      setData({ ...data, subjects: subjects });
      return;
    }

    if (target.name == "subjects") {
      setDocData({
        ...docData,
        subject: target.value,
        maxPrice: null,
      });

      const subjectData = await getSubject(target.value);
      setDocData({
        ...docData,
        subject: target.value,
        maxPrice: subjectData.maxPrice,
      });
    }
  };

  // const handleCheckboxChange = ({ target }) => {
  //   setDocData((data) => ({ ...data, validate: target.checked }));
  // };

  const handlePriceChange = ({ target }) => {
    const newValue = target.value.replace("€", "");
    if (/^\d*[,\.]?\d{0,2}$/.test(newValue)) {
      const value = newValue.replace(",", ".");
      setDocData((docData) => ({ ...docData, price: value }));
    }
  };

  const handleUpPrice = () => {
    setError((error) => ({ ...error, price: null }));
    setDocData((data) => {
      if (parseFloat(data.price) + 1 < docData.maxPrice) {
        return { ...data, price: (parseFloat(data.price) + 1).toFixed(2) };
      }
      return { ...data, price: docData.maxPrice.toFixed(2) };
    });
  };

  const handleDownPrice = () => {
    setError((error) => ({ ...error, price: null }));
    setDocData((data) => {
      if (
        parseFloat(data.price) - 1 >
        parseFloat(process.env.NEXT_PUBLIC_MIN_PRICE)
      ) {
        return { ...data, price: (parseFloat(data.price) - 1).toFixed(2) };
      }
      return {
        ...data,
        price: parseFloat(process.env.NEXT_PUBLIC_MIN_PRICE).toFixed(2),
      };
    });
  };

  const validateData = () => {
    let anyError = false;
    if (!docData.name) {
      setError((error) => ({ ...error, name: "El nombre es obligatorio" }));
      anyError = true;
    } else if (docData.name.length < 10) {
      setError((error) => ({
        ...error,
        name: "Debe tener al menos 10 caracteres",
      }));
      anyError = true;
    }

    if (!docData.description) {
      setError((error) => ({
        ...error,
        description: "La descripción es obligatoria",
      }));
      anyError = true;
    }

    if (!docData.subject) {
      setError((error) => ({
        ...error,
        subject: "Debes seleccionar una asignatura",
      }));
      anyError = true;
    }

    if (!file) {
      setError((error) => ({
        ...error,
        file: "Debes subir un archivo",
      }));
      anyError = true;
    }

    if (parseFloat(docData.price) > docData.maxPrice) {
      setError((error) => ({
        ...error,
        price: `El precio máximo de esta asignatura es ${docData.maxPrice}€`,
      }));
      anyError = true;
    }

    return anyError;
  };

  const handleSubmit = async () => {
    setError({
      name: null,
      description: null,
      subject: null,
      files: null,
      price: null,
    });
    const error = validateData();
    if (error) return;
    setState("loading");

    const folderName = uuidv4();
    const storageRef = ref(storage, "files/" + folderName);

    const fileRef = ref(storageRef, "inothy-" + file.name);

    const fileSnapshot = await uploadBytes(fileRef, file, {
      customMetadata: { user: user.uid, uploadCompleted: false },
    });

    const filePath = fileSnapshot.metadata.fullPath;

    try {
      const res = await uploadFile(user, {
        name: docData.name,
        description: docData.description,
        subject: docData.subject,
        filePath: filePath,
        requestVerification: docData.validate,
        price: docData.price,
      });

      const docId = res.path.split("/")[3];

      setState("success");
      await new Promise((res) => setTimeout(res, 2000));
      push(`/subject/${docData.subject}/${docId}`);
    } catch (e) {
      alert(e);
      setState("error");
    }
  };

  useEffect(() => {
    getUniversities().then((res) =>
      setData((data) => ({ ...data, universities: res }))
    );

    getUniversity(user.data.university).then((res) =>
      setData((data) => ({ ...data, schools: res.schools }))
    );

    getSchool(user.data.university, user.data.school).then((res) => {
      const degree = res.degrees.filter(
        (item) => item.id === user.data.degree
      )[0];

      setData((data) => ({
        ...data,
        degrees: res.degrees,
        subjects: degree.subjects,
      }));
      setDocData((docData) => ({ ...docData, subject: degree.subjects[0].id }));
      getSubject(degree.subjects[0].id).then((data) =>
        setDocData((docData) => ({
          ...docData,
          subject: degree.subjects[0].id,
          maxPrice: data.maxPrice,
        }))
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UploadDiv>
      <Title>
        <TitleImg src="/icons/upload.svg" width="5rem" aspectRatio="1" />
        <TitleText fontSize="5rem" color="secondary" margin="0 0 0 1rem">
          Subir archivo
        </TitleText>
      </Title>
      <UploadForm>
        <Column>
          <Title>
            <InputHeader fontSize="1.5rem">Nombre</InputHeader>
            {error.name && <Text color="secondary">{error.name}</Text>}
          </Title>
          <Input
            placeholder="Resumen tema 3, Apuntes literatura..."
            name="name"
            onChange={handleDataChange}
            border={
              error.name
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />
          <Title margin="1rem 0 0 0">
            <InputHeader fontSize="1.5rem">Descripción</InputHeader>
            {error.description && (
              <Text color="secondary">{error.description}</Text>
            )}
          </Title>

          <Textarea
            placeholder="Estos apuntes contienen..."
            name="description"
            onChange={handleDataChange}
            rows="4"
            border={
              error.description
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          />

          <UploadBox>
            <Fileinput
              onChange={handleFileChange}
              border={
                error.file
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
            <Text color={error.file ? "secondary" : "primary"}>
              {error.file ? error.file : file ? `${file.name}` : ""}
            </Text>
          </UploadBox>
        </Column>

        <Column>
          <Title>
            <InputHeader fontSize="1.5rem">Asignatura</InputHeader>
            {error.subject && <Text color="secondary">{error.subject}</Text>}
          </Title>
          <Select
            name="universities"
            margin="0 0 1rem 0"
            onChange={handleSubjectChange}
            value={docData.university || ""}
          >
            {data.universities &&
              data.universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
          </Select>
          <Select
            name="schools"
            margin="0 0 1rem 0"
            onChange={handleSubjectChange}
            value={docData.school || ""}
          >
            <option value=""></option>
            {data.schools &&
              data.schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
          </Select>
          <Select
            name="degrees"
            margin="0 0 1rem 0"
            onChange={handleSubjectChange}
            value={docData.degree || ""}
          >
            <option value=""></option>
            {data.degrees &&
              data.degrees.map((degree) => (
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>
              ))}
          </Select>

          <Select
            name="subjects"
            margin="0 0 1rem 0"
            onChange={handleSubjectChange}
            value={docData.subject || ""}
            border={
              error.subject
                ? `2px solid ${colors.secondary}`
                : `2px solid ${colors.primary}`
            }
          >
            <option value=""></option>
            {data.subjects &&
              data.subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} {subject.code && `(${subject.code})`}
                </option>
              ))}
          </Select>
          {/* <Checkbox onChange={handleCheckboxChange}>
            Solicitar verificación
          </Checkbox> */}
          <Title>
            <InputHeader fontSize="1.5rem">Precio</InputHeader>
            {error.price && <Text color="secondary">{error.price}</Text>}
          </Title>
          <PriceDiv>
            <Button
              onClick={handleDownPrice}
              background="white"
              height="3rem"
              width="3rem"
              margin="0"
              padding="0"
              fontSize="2rem"
              fontWeigth="bold"
              color={error.price ? "secondary" : "primary"}
              border={
                error.price
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            >
              -
            </Button>
            <Input
              onChange={handlePriceChange}
              value={`${docData.price}€`}
              width="10rem"
              fontSize="2rem"
              padding="0"
              border="none"
              textAlign="center"
              color={
                (parseFloat(docData.price) > docData.maxPrice) |
                (parseFloat(docData.price) <
                  parseFloat(process.env.NEXT_PUBLIC_MIN_PRICE))
                  ? colors.secondary
                  : colors.primary
              }
            />
            <Button
              onClick={handleUpPrice}
              background="white"
              height="3rem"
              width="3rem"
              margin="0"
              padding="0"
              fontSize="2rem"
              fontWeigth="bold"
              color={error.price ? "secondary" : "primary"}
              border={
                error.price
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            >
              +
            </Button>
          </PriceDiv>
          <Button margin="1rem 0 0 0" padding="10px 0" onClick={handleSubmit}>
            Subir
          </Button>
        </Column>
      </UploadForm>
    </UploadDiv>
  );
}
