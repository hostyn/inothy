import styled from 'styled-components'
import { Img, Text } from '@ui'
import type { KYCBaseProps } from '.'
import FormBody from '@components/FormBody'

const Columns = styled.div`
  margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: grid;
  grid-template-columns: 10rem 2rem 1fr;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 5rem 2rem 1fr;
  }
`

const StyledImg = styled(Img)`
  height: 6rem;

  @media (max-width: 768px) {
    height: 3rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default function UploadRejected({
  setState,
}: Omit<KYCBaseProps, 'userData' | 'setUserData'>): JSX.Element {
  const onSubmit = (e: React.ChangeEvent): void => {
    e.preventDefault()
    setState('documentselection')
  }
  const onBack = (): void => {
    setState('uploadaccepted')
  }
  return (
    <FormBody
      title="Verficicación de identidad"
      handleSubmit={onSubmit}
      onBack={onBack}
    >
      <StyledText fontSize="1.5rem" fontWeight="bold" margin="0 0 1rem 0">
        No se aceptarán:
      </StyledText>

      <Columns>
        <Card>
          <StyledImg src="/resources/kyc/border.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Sin los bordes visibles.</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/two.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">
            Con ambas caras en el mismo archivo.
          </StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/flash.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Con reflejos de flash.</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/blur.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">Borrosas o desenfocadas.</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/black.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">En blanco y negro.</StyledText>
        </Card>
        <Card>
          <StyledImg src="/resources/kyc/finger.svg" />
          <Img src="/icons/forbidden.svg" width="2rem" height="2rem" />
          <StyledText fontSize="1.5rem">
            Con dedos u objetos que tapen el documento.
          </StyledText>
        </Card>
      </Columns>
    </FormBody>
  )
}
