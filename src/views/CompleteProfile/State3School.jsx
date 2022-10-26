import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Img from "../../components/Img";

import normalize from "../../util/normailize";
import { useState } from "react";
import Card from "./components/Card";
import Body from "./components/Body";
import Cards from "./components/Cards";
import ButtonGrid from "./components/ButtonGrid";
import { getSchool } from "../../util/api";

export default function State3School({
  schools,
  userData,
  setUserData,
  setState,
  setApiData,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = ({ target }) => {
    setSearchQuery(normalize(target.value));
  };

  const handleSubmit = () => {
    setState("degree");
  };

  return (
    <Body>
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Facultad
      </Text>
      <Input onChange={handleChange} placeholder="Busca tu facultad" />
      <Cards>
        {schools &&
          schools.map((school) => {
            if (normalize(school.name).includes(searchQuery))
              return (
                <Card
                  key={school.id}
                  selected={userData.school === school.id}
                  onClick={() => {
                    setApiData((apiData) => ({
                      ...apiData,
                      degree: null,
                    }));
                    setUserData((data) => ({
                      ...data,
                      school: school.id,
                      schoolName: school.name,
                      degree: null,
                      degreeName: "",
                    }));
                    getSchool(userData.university, school.id).then((data) =>
                      setApiData((apiData) => ({
                        ...apiData,
                        degrees: data.degrees,
                      }))
                    );
                  }}
                >
                  <Img src="/icons/university.svg" />
                  <Text fontSize="1.5rem" cursor="inherit" userSelect="none">
                    {school.name}
                  </Text>
                </Card>
              );
          })}
      </Cards>
      <ButtonGrid>
        <Button
          disabled={!userData.school}
          onClick={handleSubmit}
          gridColumn="2"
        >
          Siguiente
        </Button>
      </ButtonGrid>
    </Body>
  );
}
