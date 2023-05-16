import styled from 'styled-components'
import { Img, Text } from '@ui'

const ErrorSuccessDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Subtitle = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

interface ErrorSuccessProps {
  type: 'error' | 'success'
  title: string
  subtitle: string
}

export default function ErrorSuccess({
  type,
  title,
  subtitle,
}: ErrorSuccessProps): JSX.Element {
  return (
    <ErrorSuccessDiv>
      <Img
        src={type === 'error' ? '/error.svg' : '/check.svg'}
        width="6rem"
        height="6rem"
      />
      <Title
        fontSize="3rem"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        {title}
      </Title>
      <Subtitle fontSize="1.5rem" textAlign="center">
        {subtitle}
      </Subtitle>
    </ErrorSuccessDiv>
  )
}
