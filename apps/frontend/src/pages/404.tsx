import App from '@components/App'
import publicContent from '@middleware/publicContent'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import Head from 'next/head'

function NotFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>Inothy - 404 No encontrado</title>
      </Head>
      <App>
        <div
          className={css({
            width: '5xl',
            maxW: '100%',
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
                fontFamily: 'nunitoSans',
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
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        </div>
      </App>
    </>
  )
}

export default publicContent(NotFound)
