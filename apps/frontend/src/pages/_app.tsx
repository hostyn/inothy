import { type AppProps } from 'next/app'
import Head from 'next/head'
import { trpc } from '@services/trpc'
import initAuth from '@config/initAuth'
import '@styles/global.css'
import { Toaster } from 'sonner'
import { nunito, nunitoSans } from '@config/fonts'

initAuth()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style>
        {`
          :root {
            --font-nunito: ${nunito.style.fontFamily};
            --font-nunito-sans: ${nunitoSans.style.fontFamily};
          }
        `}
      </style>
      <div>
        <Toaster position="bottom-right" duration={5000} />
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp)
