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
  getUniversities,
  getUniversity,
  uploadFiles,
} from "../../util/api";
import Select from "../../components/Select";
import Text from "../../components/Text";
import Img from "../../components/Img";
import Textarea from "../../components/Textarea";
import Fileinput from "../../components/Fileinput";
import Checkbox from "../../components/Checkbox";
import { colors } from "../../config/theme";

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

const UploadForm = styled.div`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadBox = styled.div`
  margin: 1rem 0 1rem 0;
  display: grid;
  grid-template-columns: 16rem 1fr;
  align-items: center;
`;

const FileBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  margin: 0 0 5px 0;
`;

export default function Upload() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({
    name: null,
    description: null,
    subject: null,
    files: null,
  });
  const [docData, setDocData] = useState({
    name: "",
    description: "",
    price: process.env.NEXT_PUBLIC_MIN_PRICE,
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
    setFiles((files) => [...files, ...target.files]);
  };

  const removeFile = ({ target }) => {
    setFiles((files) => files.filter((_, index) => index != target.id));
  };

  const handleDataChange = ({ target }) => {
    setDocData((data) => ({ ...data, [target.name]: target.value }));
  };

  const handleSubjectChange = ({ target }) => {
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
      setDocData({ ...docData, subject: target.value });
    }
  };

  const handleCheckboxChange = ({ target }) => {
    setDocData((data) => ({ ...data, validate: target.checked }));
  };

  const handlePriceChange = ({ target }) => {
    if (/^\d*[,\.]?\d{0,2}$/.test(target.value)) {
      const value = target.value.replace(",", ".");
      setDocData((docData) => ({ ...docData, price: value }));
    }
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

    if (!files.length) {
      setError((error) => ({
        ...error,
        files: "Debes subir al menos un archivo",
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
    });
    const error = validateData();
    if (error) return;

    const folderName = uuidv4();
    const storageRef = ref(storage, "files/" + folderName);
    const promises = files.map((file) => {
      const fileRef = ref(storageRef, "inothy-" + file.name);
      return uploadBytes(fileRef, file, {
        customMetadata: { user: user.uid, uploadCompleted: false },
      });
    });

    const uploadedFiles = await Promise.all(promises);
    const filesPaths = uploadedFiles.map((file) => file.metadata.fullPath);

    // TODO: Handle errors and success
    await uploadFiles(user, {
      name: docData.name,
      description: docData.description,
      subject: docData.subject,
      files: filesPaths,
      requestVerification: docData.validate,
      price: docData.price,
    });
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
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UploadDiv>
      <Title>
        <Img src="/icons/upload.svg" width="5rem" aspectRatio="1" />
        <Text fontSize="5rem" color="secondary" margin="0 0 0 1rem">
          Subir archivo
        </Text>
      </Title>
      <UploadForm>
        <Column>
          <Title>
            <Text fontSize="1.5rem">Nombre</Text>
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
            <Text fontSize="1.5rem">Descripción</Text>
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
              key={files}
              multiple
              onChange={handleFileChange}
              border={
                error.files
                  ? `2px solid ${colors.secondary}`
                  : `2px solid ${colors.primary}`
              }
            />
            <Text color={error.files ? "secondary" : "primary"}>
              {error.files
                ? error.files
                : `${files.length} archivos seleccionados.`}
            </Text>
          </UploadBox>
          {files &&
            files.map((item, index) => (
              <FileBox key={index}>
                <Text userSelect="none" color="disabledColor" id={index}>
                  {item.name}
                </Text>
                <Text
                  cursor="pointer"
                  color="disabledColor"
                  onClick={removeFile}
                  fontWeight="bold"
                  userSelect="none"
                >
                  X
                </Text>
              </FileBox>
            ))}
        </Column>

        <Column>
          <Title>
            <Text fontSize="1.5rem">Asignatura</Text>
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
                  {subject.name} ({subject.code})
                </option>
              ))}
          </Select>
          {/* <Checkbox onChange={handleCheckboxChange}>
            Solicitar verificación
          </Checkbox> */}
          <Text fontSize="1.5rem" margin="1rem 0 0 0">
            Precio
          </Text>
          <Input onChange={handlePriceChange} value={docData.price} />
          <Button margin="1rem 0 0 0" padding="10px 0" onClick={handleSubmit}>
            Subir
          </Button>
        </Column>
      </UploadForm>
    </UploadDiv>
  );
}
