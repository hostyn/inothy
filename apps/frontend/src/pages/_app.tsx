import { type AppProps } from 'next/app'
import Head from 'next/head'
import { trpc } from '@services/trpc'
import initAuth from '@config/initAuth'
import '@styles/global.css'
import { Toaster } from 'sonner'
import { nunito, nunitoSans } from '@config/fonts'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import CookieBanner from '@components/CookieBanner'
import { useEffect } from 'react'

initAuth()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
        loaded: posthog => {
          if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
        },
      })
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PostHogProvider client={posthog}>
        <div className={`${nunito.className} ${nunitoSans.variable}`}>
          <Toaster position="bottom-right" duration={5000} />
          <Component {...pageProps} />
          <CookieBanner />
        </div>
      </PostHogProvider>
    </>
  )
}

export default trpc.withTRPC(MyApp)
