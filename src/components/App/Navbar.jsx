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

  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VerifyEmailBanner = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.banner};
  max-height: ${sizes.banner};

  background-color: ${colors.primary};

  display: grid;
  grid-template-columns: 75% 1fr;

  padding: 0 10rem;

  justify-content: center;
  align-content: center;
`;

const Navbar = styled.div`
  min-width: calc(100% - 10rem);
  min-height: ${sizes.navbar};
  max-height: ${sizes.navbar};

  ${(props) =>
    !props.transparent &&
    ` background-color: #f2f2f2;
      border-radius: 0 0 30px 30px;`}

  display: grid;
  grid-template-columns: ${(props) =>
    props.logged ? "15% 25% 12.5% 12.5% 5% 22% 8%" : "15% 30% 10% 10% 1fr 1fr"};

  padding: 2rem 5rem;
  margin: 0 ${sizes.inlineMargin};

  align-items: center;
  text-align: center;
`;

const User = styled.div`
  display: flex;
  min-height: 100%;
  max-height: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 15px;
  padding: 0 1rem;
  transition: 0.2s;

  &:hover {
    background-color: ${colors.hover};
  }

  background-color: ${(props) => (props.hover ? colors.hover : "transparent")};
`;

const Menu = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;

  min-width: calc((100% - 20rem) * 0.22);
  max-width: calc((100% - 20rem) * 0.22);
  z-index: 1000;
  position: absolute;
  top: ${sizes.navbar};
  right: calc(10rem + (100% - 20rem) * 0.08);

  background-color: #ffffffaa;
  backdrop-filter: blur(5px);

  padding: 2rem;
  border-radius: 20px;
  border: 3px solid ${colors.primary};
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

export default function Nav({ transparent }) {
  const { openModal } = useModal();
  const { user, isUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const userRef = useRef(null);

  const handleClick = async () => {
    try {
      await sendVerificationEmail(user);
      // TODO: HACER BONITO ESTO
      openModal(<h1>Reenviado email de verificación</h1>);
    } catch {
      // TODO: HACER BONITO ESTO
      openModal(<h1>No hemos podido reenviar el email</h1>);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        userRef.current &&
        !(
          userRef.current.contains(event.target) ||
          menuRef.current.contains(event.target)
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
          <Text fontSize="1.5rem" color="white">
            Verifica tu email para completar el registro
          </Text>
          <Button background="secondary" onClick={handleClick}>
            Reenviar email
          </Button>
        </VerifyEmailBanner>
      )}
      <Navbar logged={isUser} transparent={transparent}>
        {/* TODO: Arreglar el link */}
        <Link href="/">
          <Img src="/imagotipo.svg" alt="Logo" height="150%" cursor="pointer" />
        </Link>
        <SearchBox />
        <Link href="/universities">
          <A textAlign="center">Universidades</A>
        </Link>
        <A textAlign="center">Información</A>
        {isUser ? (
          <>
            <Img src="/icons/chart.svg" alt="Carrito" height="70%" />
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
                {user.data.username}
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
            <Link href="/upload">
              <Button margin="0">Subir</Button>
            </Link>
            <Menu show={showMenu} ref={menuRef}>
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
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0.5rem 1rem"
              >
                ¿Por qué inothy?
              </A>
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0.5rem 1rem"
              >
                ¿Cómo funciona?
              </A>
              <A
                textAlign="left"
                color="primary"
                fontWeight="normal"
                fontSize="1rem"
                margin="0 0 0.5rem 1rem"
              >
                ¿Quiénes somos?
              </A>
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
              <Separator />
              <Button background="secondary" padding="5px 0" onClick={logout}>
                Cerrar sesión
              </Button>
            </Menu>
          </>
        ) : (
          <>
            <Button onClick={() => openModal(<AuthModal />)}>Acceder</Button>
            <Button
              background="secondary"
              onClick={() => openModal(<AuthModal selected="register" />)}
            >
              Registrarse
            </Button>
          </>
        )}
      </Navbar>
    </NavbarDiv>
  );
}
