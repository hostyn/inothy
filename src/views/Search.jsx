import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import App from "../components/App";
import Img from "../components/Img";
import SearchBox from "../components/SearchBox";
import Text from "../components/Text";
import { logEvent } from "../config/firebase";
import { colors, sizes } from "../config/theme";
import mimeTypes from "../util/mimeTypes";
import { currencyFormatter } from "../util/normailize";

const EmptySearch = styled.div`
  height: calc(100vh - ${sizes.navbar});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchDiv = styled.div`
  margin: 2rem calc(${sizes.inlineMargin} * 2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

const ResultTypeDiv = styled.div``;

const ResultTitle = styled(Text)``;

const HorizontalCard = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: ${colors.hover};
  }
`;

const DocumentCard = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 6rem;
  gap: 1rem;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: ${colors.hover};
  }
`;

const VerticalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PageSelectorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PagesDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.emphasis};
  border-radius: 10000px;
`;

const PageDiv = styled.div`
  background-color: ${(props) =>
    props.selected ? colors.primary : "transparent"};
  border-radius: 1000000px;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  ${(props) =>
    !props.selected &&
    `
    :hover { 
      background-color: ${colors.hover}
    }
  `};
`;

const getPages = (page, total) => {
  return [...Array(total).keys()].map(
    (item) =>
      item === 0 ||
      item === total - 1 ||
      item === page - 1 ||
      item === page ||
      item === page + 1
  );
};

export default function SearchView({ q }) {
  const [results, setResults] = useState(
    q?.hits.reduce((group, product) => {
      const { type } = product;
      group[type] = group[type] ?? [];
      group[type].push(product);
      return group;
    }, {})
  );

  const { push } = useRouter();

  useEffect(() => {
    setResults(
      q?.hits.reduce((group, product) => {
        const { type } = product;
        group[type] = group[type] ?? [];
        group[type].push(product);
        return group;
      }, {})
    );
  }, [q]);

  useEffect(() => {
    if (q)
      try {
        logEvent("search", { query: q.query });
      } catch {}
  }, [q]);

  return (
    <App>
      {!q ? (
        <EmptySearch>
          <Img src="/logo.svg" height="6rem" />
          <Text fontSize="2rem" fontFamily="HelveticaRounded" margin="1rem 0">
            Buscar en Inothy
          </Text>
          <SearchBox height="3rem" width="min(80%, 50rem)" noHide />
        </EmptySearch>
      ) : Object.keys(results || []).length === 0 ? (
        <EmptySearch>
          <Img src="/logo.svg" height="6rem" />
          <Text
            fontSize="1.4rem"
            fontFamily="HelveticaRounded"
            margin="1rem 0"
            maxWidth="min(80%, 50rem)"
            textAlign="center"
          >
            No hemos encontrado nada que coincida con &quot;{q.query}&quot;
          </Text>
          <SearchBox height="3rem" width="min(80%, 50rem)" noHide />
        </EmptySearch>
      ) : (
        <SearchDiv>
          <Text>
            Mostrando {q.hits.length} de {q.nbHits} resultados para{" "}
            {'"' + q.query + '"'}
          </Text>

          {/* UNIVERSITIES */}

          {results.university && (
            <ResultTypeDiv>
              <ResultTitle fontSize="2rem" fontFamily="HelveticaRounded">
                Universidades
              </ResultTitle>
              {results.university.map((item) => (
                <Link
                  key={item.objectID}
                  href={"/universities/" + item.objectID}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <VerticalText>
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name} {item.symbol && `(${item.symbol})`}
                      </Text>
                    </VerticalText>
                  </HorizontalCard>
                </Link>
              ))}
            </ResultTypeDiv>
          )}

          {/* SCHOOLS */}
          {results.school && (
            <ResultTypeDiv>
              <ResultTitle fontSize="2rem" fontFamily="HelveticaRounded">
                Facultades
              </ResultTitle>
              {results.school.map((item) => (
                <Link
                  key={item.objectID}
                  href={"/universities/" + item.objectID}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <VerticalText>
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name}
                      </Text>
                      <Text>{item.universityName}</Text>
                    </VerticalText>
                  </HorizontalCard>
                </Link>
              ))}
            </ResultTypeDiv>
          )}

          {/* DEGREES */}
          {results.degree && (
            <ResultTypeDiv>
              <ResultTitle fontSize="2rem" fontFamily="HelveticaRounded">
                Grados
              </ResultTitle>
              {results.degree.map((item) => (
                <Link
                  key={item.objectID}
                  href={"/universities/" + item.objectID}
                >
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <VerticalText>
                      <Text fontSize="1.5rem" fontFamily="HelveticaRounded">
                        {item.name}
                      </Text>
                      <Text>
                        {item.universityName} - {item.schoolName}
                      </Text>
                    </VerticalText>
                  </HorizontalCard>
                </Link>
              ))}
            </ResultTypeDiv>
          )}

          {/* SUBJECTS */}
          {results.subject && (
            <ResultTypeDiv>
              <ResultTitle fontSize="2rem" fontFamily="HelveticaRounded">
                Asignaturas
              </ResultTitle>
              {results.subject.map((item) => (
                <Link key={item.objectID} href={"/subject/" + item.objectID}>
                  <HorizontalCard>
                    <Img src={item.logoUrl} height="3rem" width="3rem" />
                    <VerticalText>
                      <Text fontSize="1.2rem" fontFamily="HelveticaRounded">
                        {item.name} {item.code && `(${item.code})`}
                      </Text>
                      <Text>{item.universityName}</Text>
                    </VerticalText>
                  </HorizontalCard>
                </Link>
              ))}
            </ResultTypeDiv>
          )}

          <PageSelectorDiv>
            <Text
              onClick={() =>
                push("/search?q=" + q.query, null, { shallow: false })
              }
              cursor={q.page === 0 ? "default" : "pointer"}
              fontWeight="bold"
              fontSize="1.5rem"
              disabled={q.page === 0}
              color={q.page === 0 ? "hover" : "primary"}
              userSelect="none"
            >
              {"<"}
            </Text>
            <PagesDiv>
              {getPages(q.page, q.nbPages)
                .reduce((current, actual, index) => {
                  if (actual) {
                    return [...current, index];
                  }

                  if (current[current.length - 1] !== false) {
                    return [...current, false];
                  }

                  return current;
                }, [])
                .map((item, index) =>
                  item !== false ? (
                    <PageDiv
                      key={item}
                      selected={q.page === item}
                      disabled={q.page === item}
                      onClick={() =>
                        push("/search?q=" + q.query + "&page=" + item, null, {
                          shallow: false,
                        })
                      }
                    >
                      <Text
                        fontSize="1rem"
                        color={q.page === item ? "white" : "black"}
                        fontWeight="bold"
                        userSelect="none"
                      >
                        {item + 1}
                      </Text>
                    </PageDiv>
                  ) : (
                    <Text key={index} userSelect="none">
                      ...
                    </Text>
                  )
                )}
            </PagesDiv>

            <Text
              onClick={() =>
                push("/search?q=" + q.query + "&page=" + (q.page + 1), null, {
                  shallow: false,
                })
              }
              cursor={q.page === q.nbPages - 1 ? "default" : "pointer"}
              fontWeight="bold"
              fontSize="1.5rem"
              disabled={q.page === q.nbPages - 1}
              color={q.page === q.nbPages - 1 ? "hover" : "primary"}
              userSelect="none"
            >
              {">"}
            </Text>
          </PageSelectorDiv>
        </SearchDiv>
      )}
    </App>
  );
}
