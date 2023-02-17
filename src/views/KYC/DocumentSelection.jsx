import styled from 'styled-components'
import Button from '../../components/Button'
import Img from '../../components/Img'
import Text from '../../components/Text'
import { colors } from '../../config/theme'

const DocumentSelectionDiv = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const DocumentsGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem 0;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 999999px;
  height: 25vw;
  width: 25vw;
  margin: auto 0;
  border: 3px solid ${colors.primary};
  gap: 1rem;
  transition: 0.2s;
  cursor: pointer;
  padding: 0.5rem;

  :hover {
    scale: 1.03;
  }

  @media (max-width: 768px) {
    height: 35vw;
    width: 35vw;
  }

  @media (max-width: 450px) {
    height: 40vw;
    width: 40vw;
  }
`

export default function DocumentSelection ({ setState }) {
  return (
    <DocumentSelectionDiv>
      <Text
        margin="0 auto 0 0"
        fontSize="2rem"
        color="secondary"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
      >
        Tipo de documento
      </Text>
      <DocumentsGrid>
        <Card onClick={() => setState('dni')}>
          <Img src="/resources/kyc/dni.svg" width="80%" height="23%" />
          <Text
            fontWeight="bold"
            fontFamily="HelveticaRounded"
            textAlign="center"
            margin="10px 0 0 0"
          >
            DNI O CARNET DE CONDUCIR
          </Text>
        </Card>
        <Card onClick={() => setState('passport')}>
          <Img src="/resources/kyc/passport.svg" width="100%" height="40%" />
          <Text
            fontWeight="bold"
            fontFamily="HelveticaRounded"
            textAlign="center"
            margin="10px 0 0 0"
          >
            PASAPORTE
          </Text>
        </Card>
      </DocumentsGrid>
      <Button
        margin="0 auto 0 0"
        height="auto"
        padding="0.5rem 1rem"
        background="white"
        color="primary"
        border={`2px solid ${colors.primary}`}
        onClick={() => setState('uploadrejected')}
      >
        Atrás
      </Button>
    </DocumentSelectionDiv>
  )
}
