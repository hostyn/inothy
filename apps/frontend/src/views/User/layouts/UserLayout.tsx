import App from '@components/App'
import { css, cx } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import Link from 'next/link'
import UserInfo from '../components/UserInfo'

export interface UserPageProps {
  username: string
}

interface UserLayoutProps extends UserPageProps {
  children: React.ReactNode
  selected?: 'documents' | 'ratings'
}

export default function UserLayout({
  username,
  children,
  selected = 'documents',
}: UserLayoutProps): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'grid',
          gridTemplateColumns: 'token(sizes.2xl) 1fr',
          gap: 'xl',
        })}
      >
        <UserInfo username={username} />
        <div>
          <nav
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: 'sm',
            })}
          >
            <Link
              className={
                selected === 'documents'
                  ? cx(styledNavButton, styledNavButtonSelected)
                  : styledNavButton
              }
              href={`/user/${username}`}
            >
              Documentos Subidos
            </Link>
            <Link
              className={
                selected === 'ratings'
                  ? cx(styledNavButton, styledNavButtonSelected)
                  : styledNavButton
              }
              href={`/user/${username}/ratings`}
            >
              Valoraciones
            </Link>
          </nav>
          {children}
        </div>
      </PageSpacing>
    </App>
  )
}

const styledNavButton = css({
  color: 'token(colors.text)',
  padding: 'sm',
  borderRadius: 'md',
  cursor: 'pointer',
  fontWeight: 'bold',
  lineHeight: '100%',
  transition: 'background-color 0.1s ease-in-out',

  _hover: {
    backgroundColor: 'token(colors.primary.100)',
  },
})

const styledNavButtonSelected = css({
  backgroundColor: 'token(colors.grey.100)',
})
