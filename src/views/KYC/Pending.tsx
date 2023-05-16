import { Button, Flex, Text } from '@ui'
import Link from 'next/link'

export default function Pending(): JSX.Element {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100%">
      <Text
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
      >
        Revisando información
      </Text>
      <Text textAlign="center">
        Estamos verificando tu identidad, este proceso puede tardar algunas
        horas.
      </Text>
      <Text textAlign="center">¡Mientras tanto puedes subir tus apuntes!</Text>
      <Link href="/upload" passHref>
        <Button margin="1rem auto 0 auto" height="auto" padding="0.5rem 1rem">
          Subir apuntes
        </Button>
      </Link>
    </Flex>
  )
}
