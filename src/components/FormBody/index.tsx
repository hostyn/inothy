import { colors } from '@config/theme'
import { Button, Title } from '@ui'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 100%;
  width: 100%;
`

const FormBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-height: 100%;
  overflow: auto;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const StyledButton = styled(Button)<{ back?: boolean }>`
  width: auto;
  border: ${props =>
    props.back ?? false ? `2px solid ${colors.primary}` : 'none'};
  background: ${props => (props.back ?? false ? colors.white : colors.primary)};
  color: ${props => (props.back ?? false ? colors.primary : colors.white)};
  margin: ${props => (props.back ?? false ? '0 auto 0 0' : '0 0 0 auto')};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

interface FormBodyProps {
  children: JSX.Element | JSX.Element[]
  title: string
  subtitle?: string
  handleSubmit: (...props: any[]) => unknown
  onBack?: () => unknown
  last?: boolean
}

export default function FormBody({
  children,
  title,
  subtitle,
  handleSubmit,
  onBack,
  last,
}: FormBodyProps): JSX.Element {
  return (
    <Form onSubmit={handleSubmit}>
      <Title textAlign="center" fontWeight="bold" fontSize="max(2rem, 2.5vw)">
        {title}
      </Title>
      {subtitle != null && (
        <Title textAlign="center" fontSize="1rem">
          {subtitle}
        </Title>
      )}
      <FormBodyDiv>{children}</FormBodyDiv>
      <ButtonGrid>
        {onBack != null && (
          <StyledButton back type="button" onClick={onBack}>
            Atrás
          </StyledButton>
        )}
        <StyledButton gridColumn="2">
          {last ?? false ? 'Terminar' : 'Continuar'}
        </StyledButton>
      </ButtonGrid>
    </Form>
  )
}
