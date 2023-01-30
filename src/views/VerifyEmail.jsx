import styled from "styled-components";
import Link from "next/link";
import Img from "../components/Img";
import Text from "../components/Text";
import A from "../components/A";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export default function VerifyEmail({ verified = false }) {
  return (
    <Wrapper>
      <Img
        src="/imagotipo.svg"
        width="20%"
        aspectRatio="100/31"
        height="initial"
      />
      {verified ? (
        <>
          <Text fontSize="3rem" margin="2rem 0 0 0">
            Email verificado
          </Text>
          <Link href="/completeprofile" passHref>
            <Button height="auto" padding="0.5rem 1rem" margin="1rem 0 0 0">
              Completar el perfil
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Text fontSize="3rem" margin="2rem 0 0 0">
            No se ha podido verificar el email
          </Text>
          <Link href="/" passHref>
            <A>Volver al home</A>
          </Link>
        </>
      )}
    </Wrapper>
  );
}
