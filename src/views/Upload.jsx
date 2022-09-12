import styled from "styled-components";
import App from "../components/App";
import { colors, sizes } from "../config/theme";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { uuidv4 } from "@firebase/util";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { useAuth } from "../context/authContext";
import {
  getDegrees,
  getSchools,
  getUniversities,
  uploadFiles,
} from "../util/api";
import Select from "../components/Select";
import Text from "../components/Text";
import Img from "../components/Img";

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};
  padding: 3rem 5rem;
  border: 3px solid ${colors.primary};
  border-radius: 20px;
`;

const Title = styled.div`
  display: flex;
`;

export default function UploadView() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [docData, setDocData] = useState({
    name: "",
    description: "",
    price: "",
    university: user.data.university,
    school: user.data.school,
    degree: user.data.degree,
    subject: null,
  });

  const [data, setData] = useState({
    universities: null,
    schools: null,
    degrees: null,
    subjects: null,
  });

  const handleFileChange = ({ target }) => {
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
      getSchools(target.value).then((response) => {
        setData({ ...data, schools: response, degrees: null, subjects: null });
      });
      // TODO: Handle api errors
      return;
    }

    if (target.name == "schools") {
      setDocData({
        ...docData,
        school: target.value,
        degree: null,
        subject: null,
      });
      setData({ ...data, degrees: null, subjects: null });
      getDegrees(docData.university, target.value).then((response) => {
        setData({ ...data, degrees: response, subjects: null });
      });
      // TODO: Handle api errors
      return;
    }

    if (target.name == "degrees") {
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

  const validateData = () => {
    if (!docData.name) {
      setError("El nombre es obligatorio");
      return;
    }

    if (!docData.description) {
      setError("La descripción es obligatoria");
      return;
    }

    if (!docData.subject) {
      setError("Debes seleccionar una asignatura");
      return;
    }

    if (!files.length) {
      setError("Debes subir al menos un archivo");
      return;
    }

    if (docData.name.length < 10) {
      setError("El nombre debe tener al menos 10 caracteres");
      return;
    }

    return 1;
  };

  const handleSubmit = async () => {
    setError(null);
    const validData = validateData();
    if (!validData) return;

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
    uploadFiles(user, {
      name: docData.name,
      description: docData.description,
      subject: docData.subject,
      files: filesPaths,
    });
  };

  useEffect(() => {
    getUniversities().then((res) =>
      setData((data) => ({ ...data, universities: res }))
    );

    getSchools(user.data.university).then((res) =>
      setData((data) => ({ ...data, schools: res }))
    );

    getDegrees(user.data.university, user.data.school).then((res) => {
      const degree = res.filter((item) => item.id === user.data.degree)[0];
      setData((data) => ({ ...data, degrees: res, subjects: degree.subjects }));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <App>
      <UploadDiv>
        <Title>
          <Img
            src="/icons/upload.svg"
            width="5rem"
            aspectRatio="1"
            margin="0 2rem 0 0"
          />
          <Text fontSize="5rem" color="secondary">
            Subir archivo
          </Text>
        </Title>
        <button onClick={() => console.log(docData)}>DocData</button>
        <button onClick={() => console.log(data)}>Data</button>
        <Input placeholder="Nombre" name="name" onChange={handleDataChange} />
        <Input
          placeholder="Descripción"
          name="description"
          onChange={handleDataChange}
        />

        <Select name="universities" onChange={handleSubjectChange}>
          {data.universities &&
            data.universities.map((uni) => (
              <option
                key={uni.id}
                value={uni.id}
                selected={uni.id === docData.university}
              >
                {uni.name}
              </option>
            ))}
        </Select>
        <Select name="schools" onChange={handleSubjectChange}>
          {data.schools &&
            data.schools.map((school) => (
              <option
                key={school.id}
                value={school.id}
                selected={school.id === docData.school}
              >
                {school.name}
              </option>
            ))}
        </Select>
        <Select name="degrees" onChange={handleSubjectChange}>
          {data.degrees &&
            data.degrees.map((degree) => (
              <option
                key={degree.id}
                value={degree.id}
                selected={degree.id === docData.degree}
              >
                {degree.name}
              </option>
            ))}
        </Select>

        <Select name="subjects" onChange={handleSubjectChange}>
          {data.subjects &&
            data.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} ({subject.code})
              </option>
            ))}
        </Select>

        <input type="file" key={files} multiple onChange={handleFileChange} />
        {files &&
          files.map((item, index) => (
            <p key={index} id={index} onClick={removeFile}>
              {item.name}
            </p>
          ))}

        {error && <Text color="secondary">{error}</Text>}

        <Button onClick={handleSubmit}>Subir</Button>
      </UploadDiv>
    </App>
  );
}
