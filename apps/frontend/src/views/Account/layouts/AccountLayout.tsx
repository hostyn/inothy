import App from '@components/App'
import { css, cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'
import PageLayout from '@ui/PageLayout'
import { FiSettings } from 'react-icons/fi'
import NextLink from 'next/link'
import { Separator } from '@ui/Separator'
import {
  AiOutlineCloudUpload,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'
import { MdLockOutline } from 'react-icons/md'
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5'
import useAuth from '@hooks/useAuth'
import EmailVerification from '../components/EmailVerification'

interface AccountLayoutProps {
  children: React.ReactNode
  selected:
    | 'profile'
    | 'security'
    | 'payment'
    | 'balance'
    | 'purchased'
    | 'uploaded'
}

export default function AccountLayout({
  children,
  selected,
}: AccountLayoutProps): JSX.Element {
  const { user } = useAuth()

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
              href="/account/profile"
              state={selected === 'profile' ? 'active' : 'inactive'}
            >
              <AiOutlineUser size={16} />
              Perfil
            </Link>

            <Link
              href="/account/security"
              state={selected === 'security' ? 'active' : 'inactive'}
            >
              <MdLockOutline size={16} />
              Seguridad
            </Link>

            <Link
              href="/account/payment"
              state={selected === 'payment' ? 'active' : 'inactive'}
            >
              <IoCardOutline size={16} />
              Pagos
            </Link>

            <Separator size="sm" />

            <Link
              href="/account/balance"
              state={selected === 'balance' ? 'active' : 'inactive'}
            >
              <IoWalletOutline size={16} />
              Saldo
            </Link>

            <Link
              href="/account/purchased"
              state={selected === 'purchased' ? 'active' : 'inactive'}
            >
              <AiOutlineShoppingCart size={16} />
              Comprado
            </Link>

            <Link
              href="/account/uploaded"
              state={selected === 'uploaded' ? 'active' : 'inactive'}
            >
              <AiOutlineCloudUpload size={16} />
              Subido
            </Link>
          </nav>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'md',
            })}
          >
            {!user.emailVerified && <EmailVerification />}
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
    display: 'flex',
    alignItems: 'center',
    gap: 'xs',

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
