import { Img, Text } from '@ui'
import Form from './components/Form'

export default function EmailSent(): JSX.Element {
  return (
    <Form>
      <Img src="/check.svg" height="5rem" />
      <Text
        textAlign="center"
        fontSize="1.5rem"
        color="secondary"
        fontFamily="HelveticaRounded"
        fontWeight="bold"
        margin="0.5rem 0 0 0"
      >
        ¡Email enviado!
      </Text>
      <Text textAlign="center">
        Revisa tu bandeja de entrada para cambiar tu contraseña.
      </Text>
    </Form>
  )
}
