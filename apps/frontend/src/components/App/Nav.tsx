import Logo from '@components/Logo'
import useAuth from '@hooks/useAuth'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { Link, LinkButton } from '@ui/Link'
import SearchBar from '@ui/SearchBar'
import Image from 'next/image'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import * as Menubar from '@radix-ui/react-menubar'

const divStyles = css({ display: 'flex', gap: 'md', alignItems: 'center' })
const linkStyles = css({
  fontSize: 'sm',
  color: 'primary.500',
  fontWeight: '500',
})

export default function Nav(): JSX.Element {
  const { user, userData } = useAuth()
  return (
    <nav
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

            <ButtonLink href="/signin">Registrarse</ButtonLink>
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
            <Menubar.Root
              className={css({
                height: '6xs',
                width: '6xs',
                borderRadius: 'md',
                overflow: 'hidden',
              })}
            >
              <Menubar.Menu>
                <Menubar.Trigger
                  className={css({
                    height: '6xs',
                    cursor: 'pointer',
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
                </Menubar.Trigger>
                <Menubar.Portal>
                  <Menubar.Content
                    className={css({
                      boxShadow: 'regular',
                      borderRadius: 'md',
                      zIndex: 10,
                      padding: 'md',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'sm',
                      width: 'xl',
                    })}
                    align="end"
                    sideOffset={5}
                    alignOffset={-3}
                  >
                    <p className={linkStyles}>
                      {userData?.username} - {user.email}
                    </p>
                    <div
                      className={css({
                        height: '2px',
                        bg: 'grey.100',
                      })}
                    />
                    <Link href="/universities" className={linkStyles}>
                      Universidades
                    </Link>

                    <Link href="/bought" className={linkStyles}>
                      Comprado
                    </Link>

                    <Link href="/uploaded" className={linkStyles}>
                      Subido
                    </Link>

                    <Link href="/balance" className={linkStyles}>
                      Saldo
                    </Link>

                    <Link href="/settings" className={linkStyles}>
                      Ajustes
                    </Link>

                    <div
                      className={css({
                        height: '2px',
                        bg: 'grey.100',
                      })}
                    />

                    <LinkButton
                      visual="warning"
                      size="sm"
                      className={css({ width: 'fit-content' })}
                      onClick={async () => {
                        await user.signOut()
                      }}
                    >
                      Cerrar sesión
                    </LinkButton>
                  </Menubar.Content>
                </Menubar.Portal>
              </Menubar.Menu>
            </Menubar.Root>
          </>
        )}
      </div>
    </nav>
  )
}
