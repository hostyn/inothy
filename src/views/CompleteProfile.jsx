import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { useAuth } from "../context/authContext";
import {
  completeProfile,
  getDegrees,
  getSchools,
  getUniversities,
  isUsernameAvailable,
} from "../util/api";

const CompleteProfile = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CompleteProfileView({ props }) {
  const { user, updateData } = useAuth();
  const { push } = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    surname: "",
    university: "",
    school: "",
    degree: "",
    ref: localStorage.getItem("ref") || null,
  });

  const [data, setData] = useState({
    universities: null,
    schools: null,
    degrees: null,
  });

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    if (target.name == "university") {
      setUserData({
        ...userData,
        university: target.value,
        school: null,
        degree: null,
      });

      setData({ ...data, schools: null, degrees: null });
      if (target.value == "") return;
      getSchools(target.value).then((response) => {
        setData({ ...data, schools: response, degrees: null });
      });
      // TODO: Handle api errors
      return;
    }

    if (target.name == "school") {
      setUserData({ ...userData, school: target.value, degree: null });
      setData({ ...data, degrees: null });
      getDegrees(userData.university, target.value).then((response) => {
        setData({ ...data, degrees: response });
      });
      // TODO: Handle api errors
      return;
    }

    setUserData({ ...userData, [target.name]: target.value });
  };

  const verifyData = (user) => {
    if (user.name.length === 0) {
      return "El nombre no puede estar vacío";
    }
    if (user.surname.length === 0) {
      return "El apellido no puede estar vacío";
    }
    if (user.username.length === 0) {
      return "En nombre de usuario no puede estar vacío";
    }
    if (user.degree.length === 0) {
      return "Debes elegir una carrera";
    }

    if (!user.name.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)) {
      return "El nombre no es válido";
    }

    if (
      !user.surname.match(/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/)
    ) {
      return "El apellido no es válido";
    }

    if (!isUsernameAvailable(user.username)) {
      return "El nombre de usuario ya está en uso";
    }
    return 0;
  };

  const handleSave = async () => {
    setError("");
    const error = verifyData(userData);
    if (error) {
      setError(error);
      return;
    }

    await completeProfile(user, userData);
    // TODO: Handle api errors
    setTimeout(async () => {
      await updateData();
      push("/");
    }, 1000);
    // TODO: Añadir mensaje perfil completado
  };

  useEffect(() => {
    if (data.universities === null) {
      getUniversities().then((response) =>
        setData({ ...data, ["universities"]: response })
      );
    }
  });

  if (!user || user.data.profileCompleted) {
    push("/");
    return <></>;
  }

  return (
    <CompleteProfile>
      <h1>Complete Profile</h1>
      <input name="name" onChange={handleChange} placeholder="name" />
      <input name="surname" onChange={handleChange} placeholder="surname" />
      <input name="username" onChange={handleChange} placeholder="username" />
      <select name="university" onChange={handleChange}>
        <option value=""></option>
        {data.universities &&
          data.universities.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          ))}
      </select>

      <select name="school" onChange={handleChange}>
        <option value=""></option>
        {data.schools &&
          data.schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
      </select>

      <select name="degree" onChange={handleChange}>
        <option value=""></option>
        {data.degrees &&
          data.degrees.map((degree) => (
            <option key={degree.id} value={degree.id}>
              {degree.name}
            </option>
          ))}
      </select>
      <button onClick={handleSave}>Guardar</button>
      {/* <button onClick={() => console.log(userData)}>Userdata</button>
      <button onClick={() => console.log(data)}>Data</button> */}

      {error && <Text color="secondary">{error}</Text>}
    </CompleteProfile>
  );
}
