import Logo from '@components/Logo'
import { css } from '@styled-system/css'
import { LinkButton } from '@ui/Button'
import { Link } from '@ui/Link'
import SearchBar from '@ui/SearchBar'

const divStyles = css({ display: 'flex', gap: 'md', alignItems: 'center' })

export default function Nav(): JSX.Element {
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
        <Link href="/login">Iniciar sesión</Link>

        <LinkButton href="/signin">Registrarse</LinkButton>
      </div>
    </nav>
  )
}
