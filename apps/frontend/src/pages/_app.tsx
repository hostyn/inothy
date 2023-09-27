import App, {
  type AppProps,
  type AppContext,
  type AppInitialProps,
} from 'next/app'
import Head from 'next/head'
import { type IncomingHttpHeaders } from 'http2'
import { trpc } from '@services/trpc'
import initAuth from '@config/initAuth'
import '@styles/global.css'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

initAuth()

interface PageProps extends AppInitialProps {
  headers: IncomingHttpHeaders | null
}

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

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<{ pageProps: PageProps }> => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return {
    pageProps: {
      ...appProps.pageProps,
      headers: appContext.ctx.req?.headers ?? null,
    },
  }
}

export default trpc.withTRPC(MyApp)
