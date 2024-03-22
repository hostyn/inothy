import { css } from '@styled-system/css'
import Footer from './Footer'
import Nav from './Nav'

export default function App({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
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
