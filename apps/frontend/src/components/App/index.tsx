import { css } from '@styled-system/css'
import Footer from './Footer'
import Nav from './Nav'
import { useEffect } from 'react'
import useAuth from '@hooks/useAuth'
import posthog from 'posthog-js'

export default function App({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const { user, userData } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (posthog.get_distinct_id() === null) return
    if (userData == null) return
    if (userData?.uid === posthog.get_distinct_id()) return

    posthog.identify(userData.uid, {
      email: user.email,
      username: userData.username,
      canUpload: userData.canUpload,
    })
  }, [userData])

  return (
    <>
      <Nav />
      <main
        className={css({
          '--minHeight': 'calc(100vh - token(spacing.6xl))',
          minHeight: 'var(--minHeight)',
          overflowX: 'hidden',
        })}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
