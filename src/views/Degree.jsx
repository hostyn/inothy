import App from "../components/App";
import styled from "styled-components";
import { colors, sizes } from "../config/theme";
import Text from "../components/Text";
import Img from "../components/Img";
import { useState } from "react";
import Link from "next/link";
import { currencyFormatter } from "../util/normailize";
import Loading from "../components/Loading";
import { getSubject } from "../util/api";
import Button from "../components/Button";

const DegreeDiv = styled.div`
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
  justify-content: center;
`;

const YearSelector = styled.div`
  display: grid;
  border-radius: 9999999px;
  background-color: ${colors.disabledBackground};
  margin: 1rem auto;
  gap: 0.5rem;

  ${(props) => `
  grid-template-columns: repeat(${props.years}, 2.5rem);

  `};
`;

const YearButton = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  width: 2.5rem;
  font-size: 1.5rem;
  color: ${(props) => (props.selected ? colors.white : "inherit")};
  background-color: ${(props) =>
    props.selected ? colors.primary : "transparent"};
  border-radius: 999999px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;

  :hover {
    ${(props) =>
      props.selected ? "initial" : `background-color: ${colors.hover}`};
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 0 1rem 0;
`;

const Card = styled.div`
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70% 30%;
  justify-items: center;
  align-items: center;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    scale: 1.05;
  }
`;

const CardTitle = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  border: 3px solid ${colors.primary};
  border-width: 3px 0 0 0;
`;

export default function DegreePage({ degree }) {
  const [yearSelected, setYearSelected] = useState(1);
  const [yearPage, setYearPage] = useState({
    1: loadDocs(degree.subjects.filter((subject) => subject.year === 1)),
  });

  function loadDocs(subjects) {
    return subjects
      .filter((subject) => subject.docs.length)
      .map((subject) => (
        <div key={subject.id}>
          <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
            {subject.name} ({subject.code})
          </Text>
          <CardGrid>
            {subject.docs.map((doc) => (
              <Link key={doc.id} href={`/subject/${subject.id}/${doc.id}`}>
                <Card>
                  <Img src="/icons/upload.svg" width="100%" />
                  <CardTitle>
                    <Text fontWeight="bold">{doc.name}</Text>
                    <Text>{currencyFormatter.format(doc.price)}</Text>
                  </CardTitle>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      ));
  }

  const handleClick = async (year) => {
    setYearSelected(year);
    if (
      !(
        typeof yearPage[year] === "undefined" ||
        typeof yearPage[year] === "null"
      )
    )
      return;

    const subjectsPromises = degree.subjects
      .filter((subject) => subject.year === year)
      .map((subject) => getSubject(subject.id));

    const subjectsData = await Promise.all(subjectsPromises);
    setYearPage((yearPage) => ({
      ...yearPage,
      [year]: loadDocs(subjectsData),
    }));
  };

  return (
    <App>
      <DegreeDiv>
        <Title>
          <Img
            src={degree.university.logoUrl}
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
              {degree.name}
            </Text>
            <Text fontSize="2rem" fontFamily="HelveticaRounded">
              {degree.school.name}
            </Text>
            <Text fontSize="2rem" fontFamily="HelveticaRounded">
              {degree.university.name}
            </Text>
          </FlexColumn>
        </Title>
        <YearSelector years={degree.years}>
          {[...Array(degree.years).keys()].map((year) => (
            <YearButton
              key={year + 1}
              selected={year + 1 === yearSelected}
              value={year + 1}
              onClick={() => handleClick(year + 1)}
            >
              {year + 1}º
            </YearButton>
          ))}
        </YearSelector>
        {!yearPage[yearSelected] ? (
          <LoadingDiv>
            <Loading />
          </LoadingDiv>
        ) : !yearPage[yearSelected].length ? (
          <>
            <Text textAlign="center" fontSize="1.5rem" margin="2rem 0 1rem 0">
              Todavía no se han subido documentos de este curso.
            </Text>
            <Text
              textAlign="center"
              fontSize="2rem"
              color="secondary"
              fontFamily="HelveticaRounded"
            >
              ¡Sé el primero!
            </Text>
            <Link href="/upload">
              <Button margin="1rem auto" padding="0.5rem 1rem">
                Subir documentos
              </Button>
            </Link>
          </>
        ) : (
          yearPage[yearSelected]
        )}
      </DegreeDiv>
    </App>
  );
}
