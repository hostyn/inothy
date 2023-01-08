import App from "../components/App";
import styled from "styled-components";
import { sizes } from "../config/theme";
import Img from "../components/Img";
import Text from "../components/Text";
import Input from "../components/Input";
import { useState } from "react";
import Loading from "../components/Loading";
import normalize from "../util/normailize";
import Card from "../components/Card";

const UniversitiesDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);

  @media (max-width: 1500px) {
    margin: 2rem ${sizes.inlineMargin};
  }

  @media (max-width: 1000px) {
    margin: 2rem;
  }
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 10vw auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5rem auto;
    justify-items: center;
  }
`;

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

const StyledImg = styled(Img)`
  aspect-ratio: 1;
  width: 10vw;
  height: 10vw;

  @media (max-width: 500px) {
    width: 5rem;
    height: 5rem;
  }
`;

const UniversitiesMap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  margin: 2rem 0;

  @media (max-width: 1500px) {
    grid-template-columns: 1fr;
  }
`;

export default function UniversitiesView({ universities }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  return (
    <App>
      <UniversitiesDiv>
        <Title>
          <StyledImg src="/icons/university.svg" priority />
          <TitleText
            fontSize="3vw"
            color="secondary"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
          >
            Universidades
          </TitleText>
        </Title>
        <Input onChange={handleSearchQuery} placeholder="Buscar universidad" />
        <UniversitiesMap>
          {!universities ? (
            <Loading />
          ) : (
            universities.map((uni) => {
              if (
                normalize(uni.name).includes(searchQuery) ||
                normalize(uni.symbol).includes(searchQuery)
              )
                return (
                  <Card
                    key={uni.id}
                    href={`/universities/${uni.id}`}
                    img={uni.logoUrl}
                    text={uni.name}
                  />
                );
            })
          )}
        </UniversitiesMap>
      </UniversitiesDiv>
    </App>
  );
}
