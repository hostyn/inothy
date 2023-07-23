import Logo from '@components/Logo'
import useAuth from '@hooks/useAuth'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { Link, LinkButton } from '@ui/Link'
import SearchBar from '@ui/SearchBar'
import Image from 'next/image'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Separator } from '@ui/Separator'

const divStyles = css({ display: 'flex', gap: 'md', alignItems: 'center' })

const linkStyles = css({
  fontSize: 'sm',
  color: 'primary.500',
  fontWeight: '500',
  width: 'calc(token(sizes.xl) - token(spacing.md) * 2)',
  p: 'xs',

  _focus: {
    outline: 'none',
    bg: 'primary.100',
  },

  _hover: {
    outline: 'none',
    bg: 'primary.100',
  },
})

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
        <Link href="/">
          <Logo />
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
              href="/uplaod"
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
                    user.id != null
                      ? user.photoURL ??
                        'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1'
                      : 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1'
                  }
                  alt="profile picture"
                  width={32}
                  height={32}
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
                    'calc(token(spacing.md) * 2 + 29px * 7 + 10px * 2)',
                })}
                align="end"
                sideOffset={10}
              >
                <nav>
                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      href={`/profile/${userData?.username ?? ''}`}
                      weight="normal"
                      className={css({
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      })}
                    >
                      {userData?.username} - {user.email}
                    </Link>
                  </DropdownMenu.Item>

                  <Separator className={css({ my: 'xs' })} />

                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      href="/universities"
                      weight="normal"
                    >
                      Universidades
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      weight="normal"
                      href="/bought"
                    >
                      Comprado
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      weight="normal"
                      href="/uploaded"
                    >
                      Subido
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      weight="normal"
                      href="/balance"
                    >
                      Saldo
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={linkStyles}>
                    <Link
                      focus="disabled"
                      hover="disabled"
                      weight="normal"
                      href="/settings"
                    >
                      Ajustes
                    </Link>
                  </DropdownMenu.Item>

                  <Separator className={css({ my: 'xs' })} />

                  <DropdownMenu.Item
                    asChild
                    className={css({
                      display: 'flex',
                      width: 'calc(token(sizes.xl) - token(spacing.md) * 2)',
                      p: 'xs',

                      _focus: {
                        bg: 'red.100',
                        outline: 'none',
                      },
                    })}
                  >
                    <LinkButton
                      visual="warning"
                      size="sm"
                      hover="disabled"
                      focus="disabled"
                      onClick={async () => {
                        await user.signOut()
                      }}
                    >
                      Cerrar sesión
                    </LinkButton>
                  </DropdownMenu.Item>
                </nav>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        )}
      </div>
    </header>
  )
}
