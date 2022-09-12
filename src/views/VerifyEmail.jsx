import styled from "styled-components";
import Link from "next/link";
import Img from "../components/Img";
import Text from "../components/Text";
import A from "../components/A";

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
          <Link href="/completeprofile">
            <A>Completar el perfil</A>
          </Link>
        </>
      ) : (
        <>
          <Text fontSize="3rem" margin="2rem 0 0 0">
            No se ha podido verificar el email
          </Text>
          <Link href="/">
            <A>Volver al home</A>
          </Link>
        </>
      )}
    </Wrapper>
  );
}
