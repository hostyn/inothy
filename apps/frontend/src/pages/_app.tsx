import { type AppProps } from 'next/app'
import Head from 'next/head'
import { trpc } from '@services/trpc'
import initAuth from '@config/initAuth'
import '@styles/global.css'
import { Toaster } from 'sonner'
import { nunito, nunitoSans } from '@config/fonts'
import { PHProvider } from '@components/PHProvider'

initAuth()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Inothy - Prepárate para aprobar"></meta>
        <meta
          name="description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>

        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content="Inothy - Prepárate para aprobar"
        ></meta>
        <meta
          property="og:description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>
        <meta
          key="og:image"
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/og.png`}
        ></meta>

        <meta
          name="twitter:card"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/og.png`}
        ></meta>
        <meta
          property="twitter:domain"
          content={process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <meta
          name="twitter:title"
          content="Inothy - Prepárate para aprobar"
        ></meta>
        <meta
          name="twitter:description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/og.png`}
        ></meta>
      </Head>
      <div className={`${nunito.className} ${nunitoSans.variable}`}>
        <PHProvider>
          <Toaster position="bottom-right" duration={5000} />
          <Component {...pageProps} />
        </PHProvider>
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp)
