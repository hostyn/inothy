import App from '@components/App'
import { css, cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'
import PageLayout from '@ui/PageLayout'
import { FiSettings } from 'react-icons/fi'
import NextLink from 'next/link'

interface AccountLayoutProps {
  children: React.ReactNode
  selected: 'general' | 'balance' | 'security'
}

export default function AccountLayout({
  children,
  selected,
}: AccountLayoutProps): JSX.Element {
  return (
    <App>
      <PageLayout title="Ajustes de la cuenta" Icon={FiSettings}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'token(sizes.lg) 1fr',
            gap: 'sm',
          })}
        >
          <nav
            className={css({
              display: 'flex',
              flexDir: 'column',
              gap: 'xs',
            })}
          >
            <Link
              href="/account/general"
              state={selected === 'general' ? 'active' : 'inactive'}
            >
              General
            </Link>
            <Link
              href="/account/balance"
              state={selected === 'balance' ? 'active' : 'inactive'}
            >
              Saldo
            </Link>
            <Link
              href="/account/security"
              state={selected === 'security' ? 'active' : 'inactive'}
            >
              Seguridad
            </Link>
          </nav>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'md',
            })}
          >
            {children}
          </div>
        </div>
      </PageLayout>
    </App>
  )
}

const linkStyles = cva({
  base: {
    px: 'sm',
    py: '2xs',
    borderRadius: 'md',
    color: 'primary.500',
    transition: 'background-color 150ms ease-in-out',

    _hover: {
      bg: 'primary.100',
    },
  },

  variants: {
    state: {
      active: {
        bg: 'grey.100',
      },

      inactive: {},
    },
  },

  defaultVariants: {
    state: 'inactive',
  },
})

const Link = styled(NextLink, linkStyles)
