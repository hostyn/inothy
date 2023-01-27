import Link from "next/link";
import styled from "styled-components";
import { colors } from "../config/theme";
import { useAuth } from "../context/authContext";
import mimeTypes from "../util/mimeTypes";
import { currencyFormatter } from "../util/normailize";
import Img from "./Img";
import Text from "./Text";
import Span from "./Span";

const Card = styled.div`
  aspect-ratio: 1;
  min-width: 15rem;
  max-width: 100%;
  min-height: 20rem;
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
  max-width: 100%;
  border: 3px solid ${colors.primary};
  border-width: 3px 0 0 0;
`;

const CardName = styled(Text)`
  word-break: break-word;
`;

export default function DocumentGridCard({ documentData, href, reference }) {
  const { user } = useAuth();
  return (
    <Link href={href}>
      <Card ref={reference}>
        <Img
          src={`/icons/files/${
            mimeTypes[documentData.contentType] || "file.svg"
          }`}
          width="60%"
          height="60%"
        />
        <CardTitle>
          <CardName width="95%" textAlign="center">
            {documentData.name.length > 50
              ? `${documentData.name.substr(0, 47)}...`
              : documentData.name}
          </CardName>
          <Text fontWeight="bold" fontSize="1.2rem">
            {user?.data?.badge.includes("ambassador") && (
              <Span
                fontSize="1rem"
                color="secondary"
                textDecoration="line-through"
                margin="0 0.5rem 0 0"
                fontWeight="normal"
              >
                {currencyFormatter.format(documentData.price)}
              </Span>
            )}
            {currencyFormatter.format(
              user?.data?.badge.includes("ambassador")
                ? documentData.price * 0.8
                : documentData.price
            )}
          </Text>
        </CardTitle>
      </Card>
    </Link>
  );
}
