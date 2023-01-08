import App from "../components/App";
import styled from "styled-components";
import { colors, sizes } from "../config/theme";
import Text from "../components/Text";
import Img from "../components/Img";
import { useState } from "react";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { getDocument } from "../util/api";
import Link from "next/link";
import { currencyFormatter } from "../util/normailize";

const UserDiv = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  margin: 3rem ${sizes.inlineMargin};
  gap: 2rem;
`;

const UserColumn = styled.div`
  border: 3px solid ${colors.primary};
  border-radius: 20px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const StudyCard = styled.div`
  width: fit-content;
  border: 2px solid ${colors.primary};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0 auto 10px 0;
  color: ${colors.primary};
`;

const UploadsDiv = styled.div`
  display: flex;
  flex-direction: column;
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

export default function User({ userData }) {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);

  useEffect(() => {
    if (userData.uploaded) {
      Promise.all(
        userData.uploaded.map(async (doc) => {
          const [subjectId, docId] = doc.split("/");
          return getDocument(subjectId, docId);
        })
      )
        .then((data) =>
          data.reduce(
            (groups, item) => ({
              ...groups,
              [item.subjectId]: [...(groups[item.subjectId] || []), item],
            }),
            {}
          )
        )
        .then((data) => {
          setUploads(data);
          setLoading(false);
        });
    } else {
      setUploads(null);
      setLoading(false);
    }
  }, [userData.uploaded]);

  return (
    <App>
      <UserDiv>
        <UserColumn>
          <Img
            src="/icons/profile.svg"
            aspectRatio="1"
            width="40%"
            height="auto"
            alignSelf="center"
          />
          <Text
            fontSize="2rem"
            color="secondary"
            fontWeight="bold"
            textAlign="center"
            margin="0.5rem 0 0.5rem 0"
          >
            {userData.username}
          </Text>
          <Text margin="0 0 1rem 0" fontSize="1.2rem">
            {userData.biography}
          </Text>
          <StudyCard>{userData.university.name}</StudyCard>
          <StudyCard>{userData.school.name}</StudyCard>
          <StudyCard>{userData.degree.name}</StudyCard>
        </UserColumn>
        {loading ? (
          <Loading />
        ) : uploads ? (
          <UploadsDiv>
            {Object.keys(uploads).map((subject) => (
              <UploadsDiv key={subject}>
                <Text fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
                  {uploads[subject][0].subject.name} (
                  {uploads[subject][0].subject.code})
                </Text>
                <CardGrid>
                  {uploads[subject].map((doc) => (
                    <Link
                      key={doc.docId}
                      href={`/subject/${subject}/${doc.docId}`}
                    >
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
              </UploadsDiv>
            ))}
          </UploadsDiv>
        ) : (
          <Text>No ha subido nada</Text>
        )}
      </UserDiv>
    </App>
  );
}
