import { colors, sizes } from '@config/theme'
import { Button, Text } from '@ui'
import { sendVerificationEmail } from '@util/api'
import { toast } from 'sonner'
import styled from 'styled-components'

const VerifyEmailBannerDiv = styled.div`
  background-color: ${colors.primary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 ${sizes.inlineMargin};

  @media (max-width: 1000px) {
    padding: 0 3rem;
  }

  @media (max-width: 650px) {
    padding: 0 1rem;

    & p {
      font-size: 1rem;
    }

    & button {
      min-width: max-content;
    }
  }
`

export default function VerifyEmailBanner(): JSX.Element {
  const handleClick = async (): Promise<void> => {
    toast.promise(sendVerificationEmail(), {
      loading: 'Estamos enviandote el email...',
      success: '!Enviado! Revisa tu bandeja de entrada.',
      error:
        'Parece que te acabamos de enviar uno... Revisa tu bandeja de entrada o vuelve a intentarlo en unos minutos.',
    })
  }

  return (
    <VerifyEmailBannerDiv>
      <Text fontSize="1.2rem" color="white">
        Verifica tu email para completar el registro
      </Text>
      <Button
        background="secondary"
        margin="0"
        padding="5px 10px"
        fontSize="1rem"
        height="auto"
        onClick={handleClick}
      >
        Reenviar email
      </Button>
    </VerifyEmailBannerDiv>
  )
}
