import styled from 'styled-components'
import { colors } from '@config/theme'
import { Img, Text } from '@ui'
import { type KYCBaseProps } from '.'
import FormBody from '@components/FormBody'

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

export default function DocumentSelection({
  setState,
}: Omit<KYCBaseProps, 'userData' | 'setUserData'>): JSX.Element {
  const onBack = (): void => {
    setState('completeProfileInfo')
  }

  return (
    <FormBody title="Selecciona un documento" onBack={onBack}>
      <DocumentsGrid>
        <Card
          onClick={() => {
            setState('dni')
          }}
        >
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
        <Card
          onClick={() => {
            setState('passport')
          }}
        >
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
    </FormBody>
  )
}
