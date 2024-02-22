import Imagotipo from '@components/Imagotipo'
import useAuth from '@hooks/useAuth'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { Link } from '@ui/Link'
import SearchBar from '@ui/SearchBar'
import Image from 'next/image'
import {
  AiOutlineCloudUpload,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Separator } from '@ui/Separator'
import { HiOutlineLibrary } from 'react-icons/hi'
import { MdLockOutline, MdOutlineLogout } from 'react-icons/md'
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5'
import DropdownLink from './components/DropdownLink'

const divStyles = css({ display: 'flex', gap: 'md', alignItems: 'center' })

export default function Nav(): JSX.Element {
  const { user, userData } = useAuth()
  return (
    <header
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'token(spacing.6xl)',
        width: '5xl',
        margin: 'auto',
      })}
    >
      <div className={divStyles}>
        <Link href="/" aria-label="Volver a la página principal">
          <Imagotipo />
        </Link>
        <SearchBar />
      </div>

      <div className={divStyles}>
        <Link href="/universities">Universidades</Link>

        {user.id == null ? (
          <>
            <Link href="/login">Iniciar sesión</Link>

            <ButtonLink href="/register">Registrarse</ButtonLink>
          </>
        ) : (
          <>
            <ButtonLink
              href="/upload"
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'sm',
              })}
            >
              Subir <AiOutlineCloudUpload size={20} />
            </ButtonLink>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                className={css({
                  height: '6xs',
                  width: '6xs',
                  borderRadius: 'md',
                  overflow: 'hidden',
                  userSelect: 'none',

                  _focusVisible: {
                    outline: '3px solid token(colors.primary.300)',
                  },
                })}
              >
                <Image
                  src={
                    userData?.avatarUrl != null
                      ? userData?.avatarUrl
                      : '/static/images/default_avatar.png'
                  }
                  alt="Foto de perfil"
                  width={64}
                  height={64}
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                asChild
                className={css({
                  boxShadow: 'regular',
                  borderRadius: 'md',
                  zIndex: 10,
                  padding: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'xl',
                  overflow: 'hidden',
                  alignItems: 'flex-end',
                  bg: 'white',

                  '&[data-state="closed"]': {
                    animation: 'dropDownClose 150ms ease-in',
                  },

                  '&[data-state="open"]': {
                    animation: 'dropDownOpen 150ms ease-out',
                  },

                  '--dropdown-height':
                    'calc(token(spacing.md) * 2 + 32px * 9 + 9px * 4)',
                })}
                align="end"
                sideOffset={10}
              >
                <nav>
                  <DropdownLink
                    name={`${userData?.username ?? ''} - ${user.email ?? ''}`}
                    href={`/user/${userData?.username ?? ''}`}
                  />

                  <Separator size="sm" className={css({ my: 'xs' })} />

                  <DropdownLink
                    Icon={HiOutlineLibrary}
                    name="Universidades"
                    href="/universities"
                  />

                  <Separator size="sm" className={css({ my: 'xs' })} />

                  <DropdownLink
                    Icon={AiOutlineUser}
                    name="Perfil"
                    href="/account/profile"
                  />

                  <DropdownLink
                    Icon={MdLockOutline}
                    name="Seguridad"
                    href="/account/security"
                  />

                  <DropdownLink
                    Icon={IoCardOutline}
                    name="Pagos"
                    href="/account/payment"
                  />

                  <Separator size="sm" className={css({ my: 'xs' })} />

                  <DropdownLink
                    Icon={IoWalletOutline}
                    name="Balance"
                    href="/account/balance"
                  />

                  <DropdownLink
                    Icon={AiOutlineShoppingCart}
                    name="Comprado"
                    href="/account/purchased"
                  />

                  <DropdownLink
                    Icon={AiOutlineCloudUpload}
                    name="Subido"
                    href="/account/uploaded"
                  />

                  <Separator size="sm" className={css({ my: 'xs' })} />

                  <DropdownLink
                    Icon={MdOutlineLogout}
                    name="Cerrar sesión"
                    onClick={async () => {
                      await user.signOut()
                    }}
                  />
                </nav>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        )}
      </div>
    </header>
  )
}
