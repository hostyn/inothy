import { useState } from 'react'
import MotionDiv from '@components/MotionDiv'
import { useModal } from '@context/modalContext'
import { Flex, Img, Text } from '@ui'
import styled from 'styled-components'
import { colors } from '@config/theme'
import { motion } from 'framer-motion'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgetPassword from './ForgetPassword'
import EmailError from './EmailError'
import EmailSent from './EmailSent'

export type ModalState =
  | 'login'
  | 'register'
  | 'forgetPassword'
  | 'emailError'
  | 'emailSent'

interface AuthModalProps {
  selected: ModalState
}

const Logo = styled(Img)`
  @media (max-height: 750px) {
    height: 15vh;
    margin: 0 0 3vh 0;
  }
`

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: min(40rem, 100vw);
  height: 30rem;
  border-radius: 1rem;
  padding: 0.3rem;

  @media (max-width: 400px) {
    width: 100vw;
  }
`

const TabsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 2px solid #dcdcdc;
  text-align: center;
`

const StyledMotionDiv = styled(MotionDiv)`
  display: grid;
  align-content: center;
  width: 100%;
  height: 100%;
`

const Underline = styled(motion.div)`
  position: relative;
  bottom: -1px;
  left: 0;
  right: 0;
  min-height: 2px;
  width: 100%;
  background: ${colors.secondary};
`

const Tab = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.selected ? '#eee' : 'transparent')};
  border-radius: 10px 10px 0 0;
`

export default function AuthModal({
  selected = 'login',
}: AuthModalProps): JSX.Element {
  const [selectedState, setSelectedState] = useState<ModalState>(selected)
  const { closeModal } = useModal()

  return (
    <Flex justifyContent="center" alignItems="center">
      <Logo
        src="/imagotipo2.svg"
        width="100%"
        height="10rem"
        margin="0 0 3rem 0"
        onClick={closeModal}
      />
      <AuthDiv>
        <TabsDiv>
          <div>
            <Tab
              onClick={() => {
                setSelectedState('login')
              }}
              selected={selectedState === 'login'}
            >
              <Text
                color="secondary"
                textAlign="center"
                fontSize="1.4rem"
                margin="0.5rem 0 0.5rem 0"
                userSelect="none"
                cursor="pointer"
              >
                Iniciar Sesión
              </Text>
            </Tab>
            {selectedState === 'login' && <Underline layoutId="underline" />}
          </div>
          <div>
            <Tab
              onClick={() => {
                setSelectedState('register')
              }}
              selected={selectedState === 'register'}
            >
              <Text
                color="secondary"
                textAlign="center"
                fontSize="1.4rem"
                margin="0.5rem 0 0.5rem 0"
                userSelect="none"
                cursor="pointer"
              >
                Registrarse
              </Text>
            </Tab>
            {selectedState === 'register' && <Underline layoutId="underline" />}
          </div>
        </TabsDiv>
        <StyledMotionDiv state={selectedState}>
          {selectedState === 'login' && (
            <LoginForm setState={setSelectedState} />
          )}
          {selectedState === 'register' && <RegisterForm />}
          {selectedState === 'forgetPassword' && (
            <ForgetPassword setState={setSelectedState} />
          )}
          {selectedState === 'emailError' && <EmailError />}
          {selectedState === 'emailSent' && <EmailSent />}
        </StyledMotionDiv>
      </AuthDiv>
    </Flex>
  )
}
