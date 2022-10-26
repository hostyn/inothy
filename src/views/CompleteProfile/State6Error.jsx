import styled from "styled-components";
import Button from "../../components/Button";
import Text from "../../components/Text";

const ErrorDiv = styled.div`
  min-height: 100%;
  min-width: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function State6Error({ setState }) {
  return (
    <ErrorDiv>
      <Text
        color="secondary"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
        fontSize="2rem"
      >
        Ha habido un problema
      </Text>
      <Text fontSize="1.2rem">Revisa la información o intentalo mas tarde</Text>
      <Button
        height="auto"
        padding="10px 2rem"
        margin="1rem 0 0 0"
        onClick={() => setState("personalData")}
      >
        Revisar información
      </Button>
    </ErrorDiv>
  );
}
