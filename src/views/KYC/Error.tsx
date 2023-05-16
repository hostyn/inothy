import { Flex, Img, Text } from '@ui'

export default function Error(): JSX.Element {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100%">
      <Img
        src="/error.svg"
        aspectRatio="1"
        width="8rem"
        height="auto"
        priority
      />
      <Text
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
        textAlign="center"
        margin="1rem 0 0 0"
      >
        Ha habido un problema
      </Text>
      <Text textAlign="center">
        Intentalo mas tarde o contacta con el soporte
      </Text>
    </Flex>
  )
}
