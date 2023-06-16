import App, {
  type AppProps,
  type AppContext,
  type AppInitialProps,
} from 'next/app'
import Providers from '../context/Providers'
import '../styles/global.css'
import { pdfjs } from 'react-pdf'
import Head from 'next/head'
import { type IncomingHttpHeaders } from 'http2'
import Cookies from '@components/Cookies'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'

interface PageProps extends AppInitialProps {
  headers: IncomingHttpHeaders | null
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Providers headers={pageProps.headers}>
        <Cookies />
        <Component {...pageProps} />
      </Providers>
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
