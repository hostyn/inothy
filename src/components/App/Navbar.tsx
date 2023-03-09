import styled from 'styled-components'
import { sizes, colors } from '@config/theme'
import Button from '@ui/Button'
import A from '@ui/A'
import Img from '@ui/Img'
import SearchBox from '@ui/SearchBox'
import { useModal } from '@context/modalContext'
import AuthModal from '../Auth/AuthModal'
import { useAuth } from '@context/authContext'
import Text from '@ui/Text'
import { sendVerificationEmail } from '@util/api'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import NavbarMenu from './components/NavbarMenu'

interface NavbarProps {
  transparent: boolean
}

interface NavbarContainerProps {
  notVerified: boolean
}

interface NavbarDivProps {
  transparent: boolean
  logged: boolean
}

interface UserPrps {
  hover: boolean
}

const NavbarContainer = styled.nav<NavbarContainerProps>`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${props =>
    props.notVerified
      ? `calc(${sizes.navbar} + ${sizes.banner})`
      : sizes.navbar};
  max-height: ${props =>
    props.notVerified
      ? `calc(${sizes.navbar} + ${sizes.banner})`
      : sizes.navbar};

  padding: 0 5rem;

  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`

const VerifyEmailBanner = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.banner};
  max-height: ${sizes.banner};

  background-color: ${colors.primary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 ${sizes.inlineMargin};

  @media (max-width: 1000px) {
    padding: 0 3rem;
  }

  @media (max-width: 650px) {
    padding: 0 1rem;

    & p {
      font-size: 1rem;
    }

    & button {
      min-width: max-content;
    }
  }
`

const NavbarDiv = styled.div<NavbarDivProps>`
  min-width: calc(100% - 10rem);
  width: 100%;
  min-height: ${sizes.navbar};
  max-height: ${sizes.navbar};

  ${props =>
    !props.transparent &&
    ` background-color: #f2f2f2;
      border-radius: 0 0 30px 30px;`}

  display: grid;
  gap: 10px;

  grid-template-columns: ${props =>
    props.logged
      ? '12rem 1fr 10rem 10rem 22rem 6rem'
      : '12rem 1fr repeat(2, 10rem) repeat(2, 12rem)'};

  padding: 2rem 2rem;

  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 1500px) {
    grid-template-columns: ${props =>
      props.logged ? '12rem 1fr 22rem' : '12rem 1fr 12rem 4rem'};
  }

  @media (max-width: 1000px) {
    grid-template-columns: ${props =>
      props.logged ? '5rem 1fr 22rem' : '5rem 1fr 4rem'};
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem calc((100% - 10rem) / 2);
    margin: 0 1rem;
  }
`

const User = styled.div<UserPrps>`
  display: flex;
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 15px;
  padding: 0 1rem;
  transition: 0.2s;

  &:hover {
    background-color: ${colors.hover};
  }

  background-color: ${props =>
    props.hover ? colors.hover : colors.userEmphasis};

  @media (max-width: 768px) {
    display: none;
  }
`

const HiddenElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1500px) {
    display: none;
  }
`

const HiddenLogo = styled.div<{ inverted?: boolean }>`
  display: ${props => (props.inverted ?? false ? 'none' : 'grid')};
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: ${props => (props.inverted ?? false ? 'grid' : 'none')};
  }

  @media (max-width: 768px) {
    display: ${props => (props.inverted ?? false ? 'none' : 'grid')};
  }
`

const HiddenButton = styled.div<{ logged: boolean; emailVerified: boolean }>`
  display: none;
  justify-content: center;
  cursor: pointer;

  ${props =>
    !props.logged &&
    `@media (max-width: 1500px) {
    display: flex;
  }`}

  @media (max-width: 768px) {
    position: absolute;
    right: 5vw;
    min-height: 2rem;
    min-width: 2rem;
    ${props =>
      props.emailVerified
        ? `top: calc((${sizes.navbar} - 2rem) / 2);`
        : `top: calc(((${sizes.navbar} - 2rem) / 2) + ${sizes.banner});`};

    display: flex;
  }
`

const HiddenLogin = styled(Button)`
  @media (max-width: 1500px) {
    display: none;
  }
`

const HiddenRegister = styled(Button)`
  @media (max-width: 1000px) {
    display: none;
  }
`

export default function Navbar({ transparent }: NavbarProps): JSX.Element {
  const { openModal } = useModal()
  const { user, isUser } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleClick = async (): Promise<void> => {
    try {
      await sendVerificationEmail()
      // TODO: HACER BONITO ESTO
      openModal(<Text>Reenviado email de verificación</Text>)
    } catch {
      // TODO: HACER BONITO ESTO
      openModal(<Text>No hemos podido reenviar el email</Text>)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        !(
          (userRef.current?.contains(event.target as Node) ?? false) ||
          (menuRef.current?.contains(event.target as Node) ?? false) ||
          (buttonRef.current?.contains(event.target as Node) ?? false)
        )
      ) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <NavbarContainer notVerified={user != null && !user.emailVerified}>
      {user != null && !user.emailVerified && (
        <VerifyEmailBanner>
          <Text fontSize="1.2rem" color="white">
            Verifica tu email para completar el registro
          </Text>
          <Button
            background="secondary"
            margin="0"
            padding="5px 10px"
            fontSize="1rem"
            onClick={handleClick}
          >
            Reenviar email
          </Button>
        </VerifyEmailBanner>
      )}
      <NavbarDiv logged={isUser} transparent={transparent}>
        <HiddenLogo>
          <Link href="/" passHref>
            <a
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img
                src="/imagotipo-beta.svg"
                alt="Logo"
                height="150%"
                cursor="pointer"
              />
            </a>
          </Link>
        </HiddenLogo>

        <HiddenLogo inverted>
          <Link href="/" passHref>
            <a
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img
                src="/logo.svg"
                alt="Logo"
                height="150%"
                cursor="pointer"
                priority
              />
            </a>
          </Link>
        </HiddenLogo>

        <SearchBox />
        <HiddenElement>
          <Link href="/universities" passHref>
            <A textAlign="center">Universidades</A>
          </Link>
        </HiddenElement>
        <HiddenElement>
          <Link href="/info" passHref>
            <A textAlign="center">Información</A>
          </Link>
        </HiddenElement>

        {/* <HiddenButton
          ref={buttonRef}
          logged={isUser}
          onClick={() => setShowMenu((state) => !state)}
        >
          <Img
            src="/resources/navbar/menu.svg"
            alt="Menú"
            aspectRatio="1"
            height="2rem"
            width="2rem"
          />
        </HiddenButton> */}
        {isUser ? (
          <>
            <User
              ref={userRef}
              hover={showMenu}
              onClick={() => {
                setShowMenu(state => !state)
              }}
            >
              <Img
                src="/resources/navbar/menu.svg"
                alt="Menú"
                aspectRatio="1"
                height="1.5rem"
                width="auto"
              />
              <Text
                fontFamily="HelveticaRounded"
                fontWeight="bold"
                fontSize="1.5rem"
                margin="0 1rem 0 1rem"
                userSelect="none"
              >
                {user?.data.username.length > 15
                  ? // TODO: Cambiar esta chapuza
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${user?.data.username.substr(0, 12)}...`
                  : user?.data.username}
              </Text>
              <Img
                src="/icons/profile.svg"
                alt="Profile"
                aspectRatio="1"
                height="2.5rem"
                width="auto"
                cursor="pointer"
              />
            </User>
            <HiddenElement>
              <Link href="/upload" passHref>
                <Button margin="0" width="100%">
                  Subir
                </Button>
              </Link>
            </HiddenElement>
          </>
        ) : (
          <>
            <HiddenLogin
              margin="0"
              onClick={() => {
                openModal(<AuthModal />)
              }}
            >
              Acceder
            </HiddenLogin>
            <HiddenRegister
              background="secondary"
              margin="0"
              onClick={() => {
                openModal(<AuthModal selected="register" />)
              }}
            >
              Registrarse
            </HiddenRegister>
          </>
        )}
        <HiddenButton
          ref={buttonRef}
          logged={isUser}
          emailVerified={user != null ? user.emailVerified : true}
          onClick={() => {
            setShowMenu(state => !state)
          }}
        >
          <Img
            src="/resources/navbar/menu.svg"
            alt="Menú"
            aspectRatio="1"
            height="2rem"
            width="2rem"
          />
        </HiddenButton>
        <NavbarMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          ref={menuRef}
        />
      </NavbarDiv>
    </NavbarContainer>
  )
}
