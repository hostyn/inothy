import styled from "styled-components";
import { sizes, colors } from "../../config/theme";
import Button from "../Button";
import A from "../A";
import Img from "../Img";
import SearchBox from "../SearchBox";
import { useModal } from "../../context/modalContext";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "../../context/authContext";
import Text from "../Text";
import { sendVerificationEmail } from "../../util/api";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NavbarDiv = styled.nav`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${(props) =>
    props.notVerified
      ? `calc(${sizes.navbar} + ${sizes.banner})`
      : sizes.navbar};
  max-height: ${(props) =>
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
`;

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
`;

const Navbar = styled.div`
  min-width: calc(100% - 10rem);
  width: 100%;
  min-height: ${sizes.navbar};
  max-height: ${sizes.navbar};

  ${(props) =>
    !props.transparent &&
    ` background-color: #f2f2f2;
      border-radius: 0 0 30px 30px;`}

  display: grid;
  gap: 10px;

  grid-template-columns: ${(props) =>
    props.logged
      ? "12rem 1fr 10rem 10rem 22rem 6rem"
      : "12rem 1fr repeat(2, 10rem) repeat(2, 12rem)"};

  padding: 2rem 2rem;

  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 1500px) {
    grid-template-columns: ${(props) =>
      props.logged ? "12rem 1fr 22rem" : "12rem 1fr 12rem 4rem"};
  }

  @media (max-width: 1000px) {
    grid-template-columns: ${(props) =>
      props.logged ? "5rem 1fr 22rem" : "5rem 1fr 4rem"};
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem calc((100% - 10rem) / 2);
    margin: 0 1rem;
  }
`;

const User = styled.div`
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

  background-color: ${(props) =>
    props.hover ? colors.hover : colors.userEmphasis};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;

  min-width: 22rem;
  max-width: 22rem;
  z-index: 100;
  position: absolute;
  top: ${sizes.navbar};
  right: calc(13rem + 10px);

  background-color: #ffffffaa;
  backdrop-filter: blur(5px);

  padding: 2rem;
  border-radius: 20px;
  border: 3px solid ${colors.primary};

  @media (max-width: 1500px) {
    right: calc(5rem + 2rem);
  }

  @media (max-width: 1000px) {
    right: calc(2rem + 2rem);
  }

  @media (max-width: 768px) {
    min-width: initial;
    max-width: initial;
    width: initial;
    min-height: calc(100vh - ${sizes.navbar});
    right: 0;
    left: 0;
  }
`;

const Item = styled.div`
  min-width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1rem;
  align-content: center;
  margin: 0;
  padding: 0.5rem 10px;
  user-select: none;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;

  &:hover {
    background-color: ${colors.hover};
  }
`;

const Separator = styled.div`
  margin: 1rem 0;
  height: 3px;
  width: 100%;
  background-color: ${colors.secondary};
`;

const HiddenElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1500px) {
    display: none;
  }
`;

const MenuHiddenButtons = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 1500px) {
    display: grid;
  }
`;

const HiddenLogo = styled.div`
  display: ${(props) => (props.inverted ? "none" : "grid")};
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: ${(props) => (props.inverted ? "grid" : "none")};
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.inverted ? "none" : "grid")};
  }
`;

const HiddenButton = styled.div`
  display: none;
  justify-content: center;

  ${(props) =>
    !props.logged &&
    `@media (max-width: 1500px) {
    display: flex;
  }`}

  @media (max-width: 768px) {
    position: absolute;
    right: 5vw;
    min-height: 2rem;
    min-width: 2rem;
    ${(props) =>
      props.emailVerified
        ? `top: calc((${sizes.navbar} - 2rem) / 2);`
        : `top: calc(((${sizes.navbar} - 2rem) / 2) + ${sizes.banner});`};

    display: flex;
  }
`;

const HiddenLogin = styled(Button)`
  @media (max-width: 1500px) {
    display: none;
  }
`;

const HiddenRegister = styled(Button)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default function Nav({ transparent }) {
  const { openModal } = useModal();
  const { user, isUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const userRef = useRef();
  const buttonRef = useRef();

  const handleClick = async () => {
    try {
      await sendVerificationEmail(user);
      // TODO: HACER BONITO ESTO
      openModal(<Text>Reenviado email de verificación</Text>);
    } catch {
      // TODO: HACER BONITO ESTO
      openModal(<Text>No hemos podido reenviar el email</Text>);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !(
          userRef.current?.contains(event.target) ||
          menuRef.current?.contains(event.target) ||
          buttonRef.current?.contains(event.target)
        )
      ) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <NavbarDiv notVerified={user && !user.emailVerified}>
      {user && !user.emailVerified && (
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
      <Navbar logged={isUser} transparent={transparent}>
        {/* TODO: Arreglar el link */}
        <HiddenLogo>
          <Link href="/" passHref>
            <a
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Img
                src="/imagotipo.svg"
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
                height: "100%",
                display: "flex",
                alignItems: "center",
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
          <Link href="/universities">
            <A textAlign="center">Universidades</A>
          </Link>
        </HiddenElement>
        <HiddenElement>
          <Link href="/info">
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
              onClick={() => setShowMenu((state) => !state)}
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
                {user.data.username.length > 15
                  ? user.data.username.substr(0, 12) + "..."
                  : user.data.username}
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
              <Link href="/upload">
                <Button margin="0" width="100%">
                  Subir
                </Button>
              </Link>
            </HiddenElement>
          </>
        ) : (
          <>
            <HiddenLogin margin="0" onClick={() => openModal(<AuthModal />)}>
              Acceder
            </HiddenLogin>
            <HiddenRegister
              background="secondary"
              margin="0"
              onClick={() => openModal(<AuthModal selected="register" />)}
            >
              Registrarse
            </HiddenRegister>
          </>
        )}
        <HiddenButton
          ref={buttonRef}
          logged={isUser}
          emailVerified={user ? user.emailVerified : true}
          onClick={() => setShowMenu((state) => !state)}
        >
          <Img
            src="/resources/navbar/menu.svg"
            alt="Menú"
            aspectRatio="1"
            height="2rem"
            width="2rem"
          />
        </HiddenButton>
        <Menu show={showMenu} ref={menuRef}>
          {isUser ? (
            <>
              <MenuHiddenButtons>
                <Link href="/upload">
                  <Item>
                    <Img
                      src="/icons/uploads.svg"
                      aspectRatio="83/50"
                      width="2rem"
                    />
                    <Text
                      fontSize="1.5rem"
                      fontWeight="bold"
                      color="secondary"
                      cursor="inherit"
                    >
                      Subir apuntes
                    </Text>
                  </Item>
                </Link>

                <Link href="/universities">
                  <Item>
                    <Img
                      src="/icons/universities.svg"
                      aspectRatio="83/50"
                      width="2rem"
                    />
                    <Text
                      fontSize="1.5rem"
                      fontWeight="bold"
                      color="secondary"
                      cursor="inherit"
                    >
                      Universidades
                    </Text>
                  </Item>
                </Link>

                <Link href="/info">
                  <Item>
                    <Img
                      src="/icons/info.svg"
                      aspectRatio="83/50"
                      width="2rem"
                    />
                    <Text
                      fontSize="1.5rem"
                      fontWeight="bold"
                      color="secondary"
                      cursor="inherit"
                    >
                      Información
                    </Text>
                  </Item>
                </Link>

                <Separator />
              </MenuHiddenButtons>
              <Link href="/account/downloads">
                <Item>
                  <Img
                    src="/icons/downloads.svg"
                    aspectRatio="83/50"
                    width="2rem"
                  />
                  <Text
                    fontSize="1.5rem"
                    fontWeight="bold"
                    color="secondary"
                    cursor="inherit"
                  >
                    Descargas
                  </Text>
                </Item>
              </Link>
              <Link href="/account/profile">
                <Item>
                  <Img src="/icons/profile.svg" aspectRatio="1" width="2rem" />
                  <Text
                    fontSize="1.5rem"
                    fontWeight="bold"
                    color="secondary"
                    cursor="inherit"
                  >
                    Cuenta
                  </Text>
                </Item>
              </Link>
              <Link href="/account/balance">
                <Item>
                  <Img
                    src="/icons/balance.svg"
                    aspectRatio="33/25"
                    width="2rem"
                  />
                  <Text
                    fontSize="1.5rem"
                    fontWeight="bold"
                    color="secondary"
                    cursor="inherit"
                  >
                    Saldo
                  </Text>
                </Item>
              </Link>
              <Link href="/account/uploads">
                <Item>
                  <Img
                    src="/icons/uploads.svg"
                    aspectRatio="83/50"
                    width="2rem"
                  />
                  <Text
                    fontSize="1.5rem"
                    fontWeight="bold"
                    color="secondary"
                    cursor="inherit"
                  >
                    Subido
                  </Text>
                </Item>
              </Link>
              <Separator />
              <Link href="/universities">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Universidades
                </A>
              </Link>
              <Link href="/info">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Información
                </A>
              </Link>
              <Link href="/legal">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Términos y condiciones
                </A>
              </Link>
              <Link href="/privacy">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Política de privacidad
                </A>
              </Link>
              <Link href="/cookies">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0 1rem"
                >
                  Política de Cookies
                </A>
              </Link>
              <Separator />
              <Button
                background="secondary"
                padding="5px 0"
                margin="0"
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                padding="0.5rem 1rem"
                margin="0 0 1rem 0"
                onClick={() => {
                  setShowMenu(false);
                  openModal(<AuthModal />);
                }}
              >
                Acceder
              </Button>
              <Button
                padding="0.5rem 1rem"
                background="secondary"
                margin="0 0"
                onClick={() => {
                  setShowMenu(false);
                  openModal(<AuthModal selected="register" />);
                }}
              >
                Registrarse
              </Button>
              <Separator />
              <Link href="/universities">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Universidades
                </A>
              </Link>
              <Link href="/info">
                <A
                  textAlign="left"
                  color="primary"
                  fontWeight="normal"
                  fontSize="1rem"
                  margin="0 0 0.5rem 1rem"
                >
                  Información
                </A>
              </Link>
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0.5rem 1rem"
              >
                Términos y condiciones
              </A>
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0.5rem 1rem"
              >
                Política de privacidad
              </A>
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0 1rem"
              >
                Política de Cookies
              </A>
            </>
          )}
        </Menu>
      </Navbar>
    </NavbarDiv>
  );
}
