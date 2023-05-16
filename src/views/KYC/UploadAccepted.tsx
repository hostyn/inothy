import styled from 'styled-components'
import { Img, Text } from '@ui'
import FormBody from '@components/FormBody'
import type { KYCBaseProps } from '.'

const TextWithCheck = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2rem 1fr;
  gap: 1rem;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Rules = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem 0;
`

const StyledImg = styled(Img)`
  @media (max-width: 900px) {
    display: none;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export default function UploadAccepted({
  setState,
}: Omit<KYCBaseProps, 'userData' | 'setUserData'>): JSX.Element {
  const onSubmit = (e: React.ChangeEvent): void => {
    e.preventDefault()
    setState('uploadrejected')
  }
  const onBack = (): void => {
    setState('completeProfileInfo')
  }

  return (
    <FormBody
      title="Verficicación de identidad"
      handleSubmit={onSubmit}
      onBack={onBack}
    >
      <StyledText fontSize="1.5rem" fontWeight="bold" margin="1rem 0 0 0">
        Solo se aceptarán:
      </StyledText>
      <Columns>
        <Rules>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              Documentos que sean válidos y actualizados.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              Que concuerden con la información proporcionada.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              En el formato adecuado: pdf, jpg, jpeg o png.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              De tamaño entre 32KB y 10MB.
            </StyledText>
          </TextWithCheck>
          <TextWithCheck>
            <Img src="/icons/check.svg" width="2rem" height="2rem" />
            <StyledText fontSize="1.5rem">
              De personas mayores de 18 años.
            </StyledText>
          </TextWithCheck>
        </Rules>
        <StyledImg src="/resources/kyc/good.svg" width="70%" margin="auto" />
      </Columns>
    </FormBody>
  )
}
