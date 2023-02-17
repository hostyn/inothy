import Img from '../components/Img'
import styled from 'styled-components'
import Text from '../components/Text'
import App from '../components/App'
import Link from 'next/link'
import A from '../components/A'
import Head from 'next/head'

const NotFoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  min-width: 100vw;
`

export default function notFound () {
  return (
    <>
      <Head>
        <title>Inothy - 404 No encontrado</title>
      </Head>
      <App>
        <NotFoundDiv>
          <Text fontSize="5rem" fontWeight="bold" color="secondary">
            404
          </Text>
          <Text fontSize="2rem" textAlign="center">
            ¡Vaya!
          </Text>
          <Text fontSize="2rem" textAlign="center">
            No hemos podido encontrar lo que buscabas
          </Text>
          <Link href="/" passHref>
            <A margin="1rem 0">Volver al home</A>
          </Link>
          <Img src="/resources/404/404.svg" aspectRatio="172/75" width="50%" />
        </NotFoundDiv>
      </App>
    </>
  )
}
