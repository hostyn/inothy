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

const HiddenNavbarAnchor = styled.div`
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

  align-items: center;

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
        {/* LOGOS */}
        <FullLogo>
          <Link href="/" passHref>
            <Img
              src="/imagotipo-beta.svg"
              alt="Logo"
              height="150%"
              cursor="pointer"
            />
          </Link>
        </FullLogo>

        <SmallLogo>
          <Link href="/" passHref>
            <Img
              src="/logo.svg"
              alt="Logo"
              height="150%"
              cursor="pointer"
              priority
            />
          </Link>
        </SmallLogo>

        {/* SEARCH BOX */}
        <SearchBox />

        {/* UNIVERSIDADES LINK */}
        <HiddenNavbarAnchor>
          <Link href="/universities" passHref>
            <A textAlign="center">Universidades</A>
          </Link>
        </HiddenNavbarAnchor>

        {/* INFORMACIÓN LINK */}
        <HiddenNavbarAnchor>
          <Link href="/info" passHref>
            <A textAlign="center">Información</A>
          </Link>
        </HiddenNavbarAnchor>

        {isUser ? (
          <>
            <UserCard
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              ref={userRef}
            />
            <HiddenNavbarAnchor>
              <Link href="/upload" passHref>
                <Button
                  margin="0"
                  width="100%"
                  height="100%"
                  padding="auto"
                  background="primary"
                >
                  Subir
                </Button>
              </Link>
            </HiddenNavbarAnchor>
          </>
        ) : (
          <>
            <HiddenLogin
              margin="0"
              background="primary"
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

        {/* BURGER BUTTON IN MOBILE */}
        <MobileBurgerMenuIcon
          ref={buttonRef}
          logged={isUser}
          onClick={() => {
            setShowMenu(state => !state)
          }}
        >
          <Img
            src="/resources/navbar/menu.svg"
            alt="Menú"
            height="2rem"
            width="2rem"
          />
        </MobileBurgerMenuIcon>

        {/* NAVBAR MENU */}
        <NavbarMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          ref={menuRef}
        />
      </NavbarDiv>
    </NavbarContainer>
  )
}
