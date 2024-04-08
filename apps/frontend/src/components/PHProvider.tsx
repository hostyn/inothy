import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import CookieBanner, { cookieConsentGiven } from './CookieBanner'

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  if (typeof window !== 'undefined') {
    posthog.init('phc_6kCCvihL3fZHqCZ2fHhlTV23Bl2TBp3hwdlAXtfUfPF', {
      api_host: 'https://eu.posthog.com',
      persistence:
        cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory',
    })
  }
  return (
    <PostHogProvider client={posthog}>
      <CookieBanner />
      {children}
    </PostHogProvider>
  )
}
