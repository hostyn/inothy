import App from "../components/App";
import styled from "styled-components";
import { colors, sizes } from "../config/theme";
import Img from "../components/Img";
import Text from "../components/Text";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getUniversities } from "../util/api";
import Link from "next/link";
import normalize from "../util/normailize";
import Card from "../components/Card";

const UniversitiesDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;
`;

const UniversitiesMap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  flex-direction: column;
  margin: 2rem 0;
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
          <Img
            src="/icons/university.svg"
            aspectRatio="1"
            height="15rem"
            width="auto"
          />
          <Text
            fontSize="5rem"
            color="secondary"
            fontWeight="bold"
            fontFamily="HelveticaRounded"
          >
            Universidades
          </Text>
        </Title>
        <Input onChange={handleSearchQuery} />
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
                  <Link key={uni.id} href={`/universities/${uni.id}`}>
                    <Card>
                      <Img
                        src={uni.logoUrl}
                        aspectRatio="1"
                        width="auto"
                        height="5rem"
                      />
                      <Text fontSize="2.5rem" userSelect="none">
                        {uni.name}
                      </Text>
                    </Card>
                  </Link>
                );
            })
          )}
        </UniversitiesMap>
      </UniversitiesDiv>
    </App>
  );
}
