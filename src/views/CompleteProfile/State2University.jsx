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
import { getUniversity } from "../../util/api";

export default function State2University({
  universities,
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
    setState("school");
  };

  return (
    <Body>
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Universidad
      </Text>
      <Input onChange={handleChange} placeholder="Busca tu universidad" />
      <Cards>
        {universities &&
          universities.map((uni) => {
            if (
              normalize(uni.name).includes(searchQuery) ||
              normalize(uni.symbol).includes(searchQuery)
            )
              return (
                <Card
                  key={uni.id}
                  selected={userData.university === uni.id}
                  onClick={() => {
                    setApiData((apiData) => ({
                      ...apiData,
                      schools: null,
                      degree: null,
                    }));
                    setUserData((data) => ({
                      ...data,
                      university: uni.id,
                      universityName: uni.name,
                      school: null,
                      schoolName: "",
                      degree: null,
                      degreeName: "",
                    }));
                    getUniversity(uni.id).then((data) =>
                      setApiData((apiData) => ({
                        ...apiData,
                        schools: data.schools,
                        degrees: null,
                      }))
                    );
                  }}
                >
                  <Img src={uni.logoUrl} aspectRatio="1" height="auto" />
                  <Text fontSize="1.5rem" cursor="inherit" userSelect="none">
                    {uni.name}
                  </Text>
                </Card>
              );
          })}
      </Cards>
      <ButtonGrid>
        <Button
          disabled={!userData.university}
          onClick={handleSubmit}
          gridColumn="2"
        >
          Siguiente
        </Button>
      </ButtonGrid>
    </Body>
  );
}
