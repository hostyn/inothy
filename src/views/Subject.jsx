import Link from "next/link";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import A from "../components/A";
import App from "../components/App";
import Button from "../components/Button";
import DocumentGridCard from "../components/DocumentGridCard";
import Img from "../components/Img";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { sizes } from "../config/theme";
import { getSubject } from "../util/api";

const SubjectDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);

  @media (max-width: 1500px) {
    margin: 2rem ${sizes.inlineMargin};
  }

  @media (max-width: 1000px) {
    margin: 2rem;
  }
`;

const NoDocumentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled(Img)`
  aspect-ratio: 1;
  width: 10vw;
  height: 10vw;

  @media (max-width: 1000px) {
    width: 5rem;
    height: 5rem;
  }
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 10vw auto;
  align-items: center;
  gap: 2rem;
  margin: 0 0 2rem 0;

  @media (max-width: 1000px) {
    grid-template-columns: 5rem 1fr;
    grid-template-rows: 5rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 5rem auto;
    justify-items: center;
  }
`;

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.7rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

const TitleSubtext = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

const VerticalText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  justify-items: center;
  margin: 0 0 1rem 0;
`;

export default function SubjectView({ subjectData: initialSubjectData }) {
  const [subjectData, setSubjectData] = useState(initialSubjectData);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && subjectData.last) {
          setLoading(true);
          const data = await getSubject(subjectData.id, 25, subjectData.last);

          if (!data.docs) {
            setSubjectData((subjectData) => ({ ...subjectData, last: false }));
            setLoading(false);
            return;
          }

          setSubjectData((subjectData) => ({
            ...subjectData,
            last: data.last,
            docs: [...subjectData.docs, ...data.docs],
          }));
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, subjectData.id, subjectData.last]
  );

  return (
    <App>
      <SubjectDiv>
        <Title>
          <Logo src={subjectData.university.logoUrl} />
          <VerticalText>
            <TitleText
              fontSize="3vw"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {subjectData.name} {subjectData.code && `(${subjectData.code})`}
            </TitleText>
            <TitleSubtext
              fontSize="2vw"
              fontWeight="bold"
              fontFamily="HelveticaRounded"
            >
              {subjectData.university.name}
            </TitleSubtext>
          </VerticalText>
        </Title>
        {subjectData.docs.length ? (
          <CardGrid>
            {subjectData.docs.map((doc, index) => {
              if (subjectData.docs.length === index + 1)
                return (
                  <DocumentGridCard
                    reference={lastElementRef}
                    key={doc.id}
                    documentData={doc}
                    href={`/subject/${subjectData.id}/${doc.id}`}
                  />
                );

              return (
                <DocumentGridCard
                  key={doc.id}
                  documentData={doc}
                  href={`/subject/${subjectData.id}/${doc.id}`}
                />
              );
            })}
          </CardGrid>
        ) : (
          <NoDocumentsDiv>
            <Text textAlign="center" fontSize="1.5rem" margin="2rem 0 1rem 0">
              Todavía no se han subido documentos a esta asignatura.
            </Text>
            <Text
              textAlign="center"
              fontSize="2rem"
              color="secondary"
              fontFamily="HelveticaRounded"
            >
              ¡Sé el primero!
            </Text>
            <Link href="/upload" passHref>
              <Button margin="1rem auto" padding="0.5rem 1rem">
                Subir documentos
              </Button>
            </Link>
          </NoDocumentsDiv>
        )}
        {loading && <Loading />}
      </SubjectDiv>
    </App>
  );
}
