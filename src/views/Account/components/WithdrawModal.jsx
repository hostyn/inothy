import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Text from "../../../components/Text";
import { colors } from "../../../config/theme";
import { useAuth } from "../../../context/authContext";
import { useModal } from "../../../context/modalContext";
import { payout } from "../../../util/api";
import { currencyFormatter } from "../../../util/normailize";

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 3rem 5rem;
  width: min(50rem, 100vw);

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const WithdrawConfirmationModal = styled.div`
  border-radius: 20px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
`;

const InlineText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Body = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function WithdrawModal({ balance, bank }) {
  const { user } = useAuth();
  const [state, setState] = useState("withdraw");
  const { closeModal } = useModal();

  const handleWithdraw = async () => {
    setState("loading");
    try {
      await payout(user);
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <WithdrawConfirmationModal>
      <MotionDiv
        key={state}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 20 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.15 }}
      >
        {state === "withdraw" && (
          <>
            <Title fontSize="2rem" color="secondary" fontWeight="bold">
              Confirmar retiro
            </Title>
            <Body fontSize="1.5rem" margin="1rem 0">
              ¿Quieres retirar {currencyFormatter.format(balance)} a la cuenta
              bancaria {bank.IBAN}?
            </Body>
            <InlineText>
              <Button
                margin="0"
                padding="0.5rem 1rem"
                color="primary"
                background="white"
                border={`2px solid ${colors.primary}`}
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button margin="0" padding="0.5rem 1rem" onClick={handleWithdraw}>
                Confirmar
              </Button>
            </InlineText>
          </>
        )}

        {state === "loading" && <Loading />}
        {state === "success" && (
          <>
            <Title fontSize="2rem" color="secondary" fontWeight="bold">
              Retiro Solicitado
            </Title>
            <Body fontSize="1.2rem" margin="1rem 0">
              En recibiras el dinero en tu cuenta bancaria. <br /> Esto puede
              tardar entre 1 y 3 dias laborales.
            </Body>
            <Button
              height="auto"
              margin="0 auto"
              padding="0.5rem 1rem"
              width="auto"
              onClick={() => closeModal()}
            >
              Aceptar
            </Button>
          </>
        )}
        {state === "error" && (
          <>
            <Text fontSize="2rem" color="secondary" fontWeight="bold">
              Ha ocurrido un error
            </Text>
            <Text fontSize="1.2rem" margin="auto 0">
              Intentalo mas tarde o contacta con el soporte si el error
              persiste.
            </Text>
            <Button
              height="auto"
              margin="0 auto"
              padding="0.5rem 1rem"
              width="auto"
              onClick={() => closeModal()}
            >
              Aceptar
            </Button>
          </>
        )}
      </MotionDiv>
    </WithdrawConfirmationModal>
  );
}
