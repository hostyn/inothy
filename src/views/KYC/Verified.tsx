import { Button, Flex, Text } from '@ui'
import Link from 'next/link'

export default function Verified() {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100%">
      <Text
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
      >
        ¡Ya has verificado tu identidad!
      </Text>
      <Text textAlign="center">
        Ya puedes retirar tu saldo a tu cuenta bancaria
      </Text>
      <Link href="/account/balance" passHref>
        <Button margin="1rem auto 0 auto" height="auto" padding="0.5rem 1rem">
          Retirar
        </Button>
      </Link>
    </Flex>
  )
}
