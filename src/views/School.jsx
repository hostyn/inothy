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
  display: flex;
  flex-direction: column;
  margin: 2rem calc(${sizes.inlineMargin} * 2);
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
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
          <Img
            src={school.university.logoUrl}
            aspectRatio="1"
            width="auto"
            height="15rem"
          />
          <FlexColumn>
            <Text
              fontSize="4rem"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {school.name}
            </Text>
            <Text
              fontSize="2rem"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {school.university.name}
            </Text>
          </FlexColumn>
        </Title>
        <Input onChange={handleQuerySearch} />
        {school.degrees &&
          school.degrees.map((degree) => {
            if (normalize(degree.name).includes(searchQuery))
              return (
                <Link key={degree.id} href={`${asPath}/${degree.id}`}>
                  <Card>
                    <Img
                      src="/icons/university.svg"
                      aspectRatio="1"
                      height="5rem"
                      width="auto"
                    />
                    <Text fontSize="2.5rem" userSelect="none">
                      {degree.name}
                    </Text>
                  </Card>
                </Link>
              );
          })}
      </SchoolDiv>
    </App>
  );
}
