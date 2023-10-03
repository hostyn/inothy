import { type AppProps } from 'next/app'
import Head from 'next/head'
import { trpc } from '@services/trpc'
import initAuth from '@config/initAuth'
import '@styles/global.css'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

initAuth()

const nunito = Nunito({ subsets: ['latin'] })
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--nunito-sans',
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${nunito.className} ${nunitoSans.className}`}>
        <Toaster position="bottom-right" duration={5000} />
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp)
