import Menu from "../../components/Account/Menu";
import App from "../../components/App";
import styled from "styled-components";
import { colors, sizes } from "../../config/theme";
import Text from "../../components/Text";
import Img from "../../components/Img";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import Select from "../../components/Select";
import { getDegrees, getSchools, getUniversities } from "../../util/api";

const ProfileGrid = styled.div`
  height: ${sizes.accountHeight};
  display: grid;
  grid-template-columns: 55% 1fr;
  grid-template-rows: 55% 1fr;
  gap: 2rem;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 20px;
  border: 3px solid ${colors.primary};
  padding: 3rem;

  grid-column: ${(props) => props.girdColumn || "auto"};
  grid-row: ${(props) => props.gridRow || "auto"};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ProfileView() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: user.data.name,
    surname: user.data.surname,
  });

  const [data, setData] = useState({
    universities: null,
    schools: null,
    degrees: null,
  });

  const handleChange = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  useEffect(() => {
    getUniversities().then((res) =>
      setData((data) => ({ ...data, universities: res }))
    );

    getSchools(user.data.university).then((res) =>
      setData((data) => ({ ...data, schools: res }))
    );

    getDegrees(user.data.university, user.data.school).then((res) =>
      setData((data) => ({ ...data, degrees: res }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <App>
      <Menu profile>
        <ProfileGrid>
          <ProfileBox girdColumn="1" gridRow="1 / 3">
            <Header>
              <Text fontSize="3rem" color="secondary">
                Info. Personal
              </Text>
              <Img
                src="/icons/profile.svg"
                aspectRatio="1"
                height="6rem"
                width="auto"
              />
            </Header>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Nombre
              </Text>
              <Input
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Apellidos
              </Text>
              <Input
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="surname"
                value={userData.surname}
                onChange={handleChange}
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Correo electrónico
              </Text>
              <Input
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="name"
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Text fontSize="1.5rem" margin="0 0 0.5rem 0">
                Biografía
              </Text>
              <Textarea
                border={`2px solid ${colors.primary}`}
                borderRadius="10px"
                padding="10px"
                name="name"
                rows="4"
                disabled
              />
            </InputDiv>
          </ProfileBox>
          <ProfileBox girdColumn="2" gridRow="1">
            <Text fontSize="3rem" color="secondary">
              Universidad
            </Text>
            <Select disabled>
              {data.universities &&
                data.universities.map((uni) => (
                  <option
                    key={uni.id}
                    selected={uni.id === user.data.university}
                  >
                    {uni.name}
                  </option>
                ))}
            </Select>
            <Select disabled>
              {data.schools &&
                data.schools.map((school) => (
                  <option
                    key={school.id}
                    selected={school.id === user.data.school}
                  >
                    {school.name}
                  </option>
                ))}
            </Select>
            <Select disabled>
              {data.degrees &&
                data.degrees.map((degree) => (
                  <option
                    key={degree.id}
                    selected={degree.id === user.data.degree}
                  >
                    {degree.name}
                  </option>
                ))}
            </Select>
          </ProfileBox>
          <ProfileBox girdColumn="2" gridRow="2">
            <h1>Profile</h1>
          </ProfileBox>
        </ProfileGrid>
      </Menu>
    </App>
  );
}
