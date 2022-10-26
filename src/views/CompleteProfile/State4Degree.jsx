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

export default function State4Degrees({
  degrees,
  userData,
  setUserData,
  submit,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = ({ target }) => {
    setSearchQuery(normalize(target.value));
  };

  return (
    <Body>
      <Text
        fontSize="3rem"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        textAlign="center"
      >
        Grado
      </Text>
      <Input onChange={handleChange} placeholder="Busca tu grado" />
      <Cards>
        {degrees &&
          degrees.map((degree) => {
            if (normalize(degree.name).includes(searchQuery))
              return (
                <Card
                  key={degree.id}
                  selected={userData.degree === degree.id}
                  onClick={() => {
                    setUserData((data) => ({
                      ...data,
                      degree: degree.id,
                      degreeName: degree.name,
                    }));
                  }}
                >
                  <Img src="/icons/university.svg" />
                  <Text fontSize="1.5rem" cursor="inherit" userSelect="none">
                    {degree.name}
                  </Text>
                </Card>
              );
          })}
      </Cards>
      <ButtonGrid>
        <Button disabled={!userData.degree} onClick={submit} gridColumn="2">
          Finalizar
        </Button>
      </ButtonGrid>
    </Body>
  );
}
