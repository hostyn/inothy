import App from "../components/App";
import styled from "styled-components";
import { colors, sizes } from "../config/theme";
import Img from "../components/Img";
import Text from "../components/Text";
import Input from "../components/Input";
import { useState } from "react";
import normalize from "../util/normailize";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "../components/Card";

const UniversityDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem calc(${sizes.inlineMargin} * 2);
`;

const Logo = styled(Img)`
  border: 3px solid ${colors.primary};
  border-radius: 99999px;
  overflow: hidden;
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;
`;

export default function UniversityPage({ university }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { asPath } = useRouter();

  const handleQuerySearch = ({ target }) => {
    setSearchQuery(target.value);
  };

  return (
    <App>
      <UniversityDiv>
        <Title>
          <Img
            src={university.logoUrl}
            aspectRatio="1"
            width="auto"
            height="15rem"
          />
          <Text fontSize="4rem" fontWeight="bold" fontFamily="HelveticaRounded">
            {university.name}
          </Text>
        </Title>
        <Input margin=" 0 0 2rem 0" onChange={handleQuerySearch} />
        {university.schools &&
          university.schools.map((school) => {
            if (normalize(school.name).includes(searchQuery))
              return (
                <Link key={school.id} href={`${asPath}/${school.id}`}>
                  <Card>
                    <Img
                      src="/icons/university.svg"
                      aspectRatio="1"
                      height="5rem"
                      width="auto"
                    />
                    <Text fontSize="2.5rem" userSelect="none">
                      {school.name}
                    </Text>
                  </Card>
                </Link>
              );
          })}
      </UniversityDiv>
    </App>
  );
}
