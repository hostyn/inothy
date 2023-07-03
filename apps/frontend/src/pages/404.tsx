import App from '@components/App'
import { css } from '@styled-system/css'
import { LinkButton } from '@ui/Button'
import Head from 'next/head'

export default function notFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - 404 No encontrado</title>
      </Head>
      <App>
        <div
          className={css({
            width: '5xl',
            margin: 'auto',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'inherit',
            gap: 'md',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <h1
              className={css({
                fontSize: '4xl',
                fontWeight: 'bold',
                color: 'primary.500',
                lineHeight: '1',
              })}
            >
              404
            </h1>
            <p
              className={css({
                color: 'primary.500',
                fontWeight: '500',
                fontSize: 'lg',
              })}
            >
              Parece que esta página no existe.
            </p>
          </div>
          <LinkButton href="/">Volver al inicio</LinkButton>
        </div>
      </App>
    </>
  )
}
