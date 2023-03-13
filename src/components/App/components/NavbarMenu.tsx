import AuthModal from '@components/Auth/AuthModal'
import { colors, sizes } from '@config/theme'
import { useAuth } from '@context/authContext'
import { useModal } from '@context/modalContext'
import { A, Button, Img, Text } from '@ui'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import type { Dispatch, ForwardedRef, SetStateAction } from 'react'
import { forwardRef } from 'react'
import styled from 'styled-components'

interface NavbarMenuProps {
  showMenu: boolean
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

const MenuDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;

  min-width: 22rem;
  max-width: 22rem;
  z-index: 100;
  position: absolute;
  top: ${sizes.navbar};
  right: calc(13rem + 10px);

  background-color: #ffffffaa;
  backdrop-filter: blur(4px);

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
`

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
`

const Separator = styled.div`
  margin: 1rem 0;
  height: 3px;
  width: 100%;
  background-color: ${colors.secondary};
`

const MenuHiddenButtons = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 1500px) {
    display: grid;
  }
`

function NavbarMenu(
  { showMenu, setShowMenu }: NavbarMenuProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { isUser, logout } = useAuth()
  const { openModal } = useModal()

  return (
    <AnimatePresence>
      {showMenu && (
        <MenuDiv
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {isUser ? (
            <>
              <MenuHiddenButtons>
                <Link href="/upload" passHref>
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

                <Link href="/universities" passHref>
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

                <Link href="/info" passHref>
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
              <Link href="/account/downloads" passHref>
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
              <Link href="/account/profile" passHref>
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
              <Link href="/account/balance" passHref>
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
              <Link href="/account/uploads" passHref>
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
              <Link href="/universities" passHref>
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
              <Link href="/info" passHref>
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
              <Link href="/legal" passHref>
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
              <Link href="/privacy" passHref>
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
              <Link href="/cookies" passHref>
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
                onClick={async () => {
                  await logout()
                  setShowMenu(false)
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
                  setShowMenu(false)
                  openModal(<AuthModal />)
                }}
              >
                Acceder
              </Button>
              <Button
                padding="0.5rem 1rem"
                background="secondary"
                margin="0 0"
                onClick={() => {
                  setShowMenu(false)
                  openModal(<AuthModal selected="register" />)
                }}
              >
                Registrarse
              </Button>

              <MenuHiddenButtons>
                <Separator />
                <Link href="/search" passHref>
                  <Item>
                    <Img
                      src="/icons/search.svg"
                      aspectRatio="83/50"
                      width="2rem"
                    />
                    <Text
                      fontSize="1.5rem"
                      fontWeight="bold"
                      color="secondary"
                      cursor="inherit"
                    >
                      Buscar
                    </Text>
                  </Item>
                </Link>

                <Link href="/universities" passHref>
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

                <Link href="/info" passHref>
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
              </MenuHiddenButtons>

              <Separator />
              <Link href="/universities" passHref>
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
              <Link href="/info" passHref>
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
              <Link href="/legal" passHref>
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
              <Link href="privacy" passHref>
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
              <Link href="/cookies" passHref>
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
            </>
          )}
        </MenuDiv>
      )}
    </AnimatePresence>
  )
}

export default forwardRef(NavbarMenu)
