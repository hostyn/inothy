import styled from "styled-components";
import { colors, sizes } from "../../config/theme";
import Text from "../../components/Text";
import Img from "../../components/Img";
import A from "../../components/A";
import Link from "next/link";

const AccountDiv = styled.div`
  margin: 0 ${sizes.inlineMargin};
  padding: 3rem 0;

  @media (max-width: 1000px) {
    margin: 0 2rem;
    min-height: calc(100vh - ${sizes.navbar} - 6rem);
    margin: 0 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    min-height: inherit;
  }
`;

const MenuBackground = styled.div`
  background-image: url("/resources/account/menu.svg");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;
  margin: 0 0 auto 0;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const MenuDiv = styled.div`
  height: calc(${sizes.accountHeight} - 6rem);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 4rem 4% 2rem 3%;
  padding: 2rem;
  border-radius: 10px;
  border: 3px solid ${colors.primary};
`;

const Item = styled.div`
  min-width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1rem;
  align-items: center;
  user-select: none;
  cursor: pointer;
  border-radius: 20px;
  padding: 0.2rem 1rem;
  transition: 0.2s;
  background-color: ${(props) =>
    props.active ? colors.primary : "transparent"};

  &:hover {
    ${(props) => !props.active && `background-color: ${colors.hover}`};
  }
`;

const Separator = styled.div`
  margin: 0 0 1rem 0;
  height: 3px;
  width: 100%;
  background-color: ${colors.secondary};
`;

export default function Menu({
  children,
  downloads = false,
  profile = false,
  balance = false,
  uploads = false,
  settings = false,
}) {
  return (
    <AccountDiv>
      <Grid>
        <MenuBackground>
          <MenuDiv>
            <Link href="/account/downloads">
              <Item active={downloads}>
                <Img
                  src={
                    downloads
                      ? "/icons/downloads_inverted.svg"
                      : "/icons/downloads.svg"
                  }
                  aspectRatio="83/50"
                />
                <Text
                  cursor="inherit"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color={downloads ? "white" : "secondary"}
                >
                  Descargas
                </Text>
              </Item>
            </Link>
            <Link href="/account/profile">
              <Item active={profile}>
                <Img
                  src={
                    profile
                      ? "/icons/profile_inverted.svg"
                      : "/icons/profile.svg"
                  }
                  aspectRatio="1"
                />
                <Text
                  cursor="inherit"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color={profile ? "white" : "secondary"}
                >
                  Cuenta
                </Text>
              </Item>
            </Link>
            <Link href="/account/balance">
              <Item active={balance}>
                <Img
                  src={
                    balance
                      ? "/icons/balance_inverted.svg"
                      : "/icons/balance.svg"
                  }
                  aspectRatio="33/25"
                />
                <Text
                  cursor="inherit"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color={balance ? "white" : "secondary"}
                >
                  Saldo
                </Text>
              </Item>
            </Link>
            <Link href="/account/uploads">
              <Item active={uploads}>
                <Img
                  src={
                    uploads
                      ? "/icons/uploads_inverted.svg"
                      : "/icons/uploads.svg"
                  }
                  aspectRatio="83/50"
                />
                <Text
                  cursor="inherit"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color={uploads ? "white" : "secondary"}
                >
                  Subido
                </Text>
              </Item>
            </Link>
            {/* <Link href="/account/settings">
              <Item active={settings}>
                <Img
                  src={
                    settings
                      ? "/icons/settings_inverted.svg"
                      : "/icons/settings.svg"
                  }
                  aspectRatio="83/50"
                />
                <Text
                  cursor="inherit"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color={settings ? "white" : "secondary"}
                >
                  Seguridad
                </Text>
              </Item>
            </Link> */}
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
          </MenuDiv>
        </MenuBackground>
        {children}
      </Grid>
    </AccountDiv>
  );
}
