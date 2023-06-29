import styled from 'styled-components'
import App from '@components/App'
import Link from 'next/link'
import Head from 'next/head'
import { A, Img, Text } from '@ui'

const NotFoundDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  min-width: 100vw;
`

export default function notFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - 404 No encontrado</title>
      </Head>
      <h1>404</h1>
    </>
  )
}
