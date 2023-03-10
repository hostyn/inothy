import styled from 'styled-components'
import { sizes } from '@config/theme'
import { useModal } from '@context/modalContext'
import { useAuth } from '@context/authContext'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import NavbarMenu from './components/NavbarMenu'
import UserCard from './components/UserCard'
import useBanner from '@context/bannerContext'
import AuthModal from '@components/Auth/AuthModal'
import { A, Button, Img, SearchBox } from '@ui'

interface NavbarProps {
  transparent: boolean
}

interface NavbarContainerProps {
  isBanner: boolean
}

interface NavbarDivProps {
  transparent: boolean
  logged: boolean
}

const NavbarContainer = styled.nav<NavbarContainerProps>`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.navbar};
  max-height: ${sizes.navbar};

  padding: 0 5rem;

  position: absolute;
  top: ${props => (props.isBanner ? sizes.banner : '0')};

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

const HiddenElement1500 = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1500px) {
    display: none;
  }
`

const FullLogo = styled.div`
  display: grid;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: grid;
  }
`

const SmallLogo = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: grid;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileBurgerMenuIcon = styled.div<{
  logged: boolean
  isBanner: boolean
}>`
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
      props.isBanner
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
  const { isUser } = useAuth()
  const { isBanner } = useBanner()

  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

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
    <NavbarContainer isBanner={isBanner}>
      <NavbarDiv logged={isUser} transparent={transparent}>
        <FullLogo>
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
        </FullLogo>

        <SmallLogo>
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
        </SmallLogo>

        <SearchBox />
        <HiddenElement1500>
          <Link href="/universities" passHref>
            <A textAlign="center">Universidades</A>
          </Link>
        </HiddenElement1500>
        <HiddenElement1500>
          <Link href="/info" passHref>
            <A textAlign="center">Información</A>
          </Link>
        </HiddenElement1500>

        {isUser ? (
          <>
            <UserCard
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              ref={userRef}
            />
            <HiddenElement1500>
              <Link href="/upload" passHref>
                <Button margin="0" width="100%">
                  Subir
                </Button>
              </Link>
            </HiddenElement1500>
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
        <MobileBurgerMenuIcon
          ref={buttonRef}
          logged={isUser}
          isBanner={isBanner}
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
        </MobileBurgerMenuIcon>
        <NavbarMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          ref={menuRef}
        />
      </NavbarDiv>
    </NavbarContainer>
  )
}
