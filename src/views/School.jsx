import App from "../components/App";
import styled from "styled-components";
import Text from "../components/Text";
import { sizes } from "../config/theme";
import Img from "../components/Img";
import Input from "../components/Input";
import { useState } from "react";
import normalize from "../util/normailize";
import Link from "next/link";
import Card from "../components/Card";
import { useRouter } from "next/router";

const SchoolDiv = styled.div`
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

const Logo = styled(Img)`
  aspect-ratio: 1;
  width: 10vw;
  height: 10vw;

  @media (max-width: 500px) {
    width: 5rem;
    height: 5rem;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.8rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

const SubtitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

export default function SchoolPage({ school }) {
  const { asPath } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleQuerySearch = ({ target }) => {
    setSearchQuery(target.value);
  };

  return (
    <App>
      <SchoolDiv>
        <Title>
          <Logo src={school.university.logoUrl} />
          <FlexColumn>
            <TitleText
              fontSize="3vw"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {school.name}
            </TitleText>
            <SubtitleText fontSize="2.5vw" fontFamily="HelveticaRounded">
              {school.university.name}
            </SubtitleText>
          </FlexColumn>
        </Title>
        <Input onChange={handleQuerySearch} placeholder="Buscar carrera" />
        {school.degrees &&
          school.degrees.map((degree) => {
            if (normalize(degree.name).includes(searchQuery))
              return (
                <Card
                  key={degree.id}
                  href={`${asPath}/${degree.id}`}
                  img="/icons/university.svg"
                  text={degree.name}
                />
              );
          })}
      </SchoolDiv>
    </App>
  );
}
