import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../config/theme";
import Button from "./Button";
import Text from "./Text";

const Backdrop = styled.div`
  background-color: ${colors.backdrop};
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: ${colors.white};
  min-width: min(30rem, 100vw);
  min-height: 15rem;
  width: 40vw;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px ${colors.shadow};
`;

const InlineText = styled.div`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export default function Cookies() {
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCookiesAccepted = localStorage.getItem("cookiesAccepted");
      setCookiesAccepted(localCookiesAccepted === "true");
    }
  }, []);

  return (
    <>
      {!cookiesAccepted && (
        <Backdrop>
          <Modal>
            <Text fontSize="2rem">Cookies</Text>
            <Text textAlign="center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              quasi optio cumque quam? Harum sed autem fugiat aperiam. Sed
              magnam adipisci minima perferendis vel sit voluptatibus magni quis
              dolorem tempore.
            </Text>
            <InlineText>
              <Button
                margin="0"
                padding="0.5rem 1rem"
                background="secondary"
                height="auto"
                onClick={() => history.back()}
              >
                Rechazar cookies
              </Button>
              <Button
                padding="0.5rem 1rem"
                onClick={handleAccept}
                margin="0"
                height="auto"
              >
                Aceptar cookies
              </Button>
            </InlineText>
          </Modal>
        </Backdrop>
      )}
    </>
  );
}
