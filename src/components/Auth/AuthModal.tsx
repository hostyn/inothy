import { useState } from 'react'
import MotionDiv from '@components/MotionDiv'
import { useModal } from '@context/modalContext'
import { Img, Text } from '@ui'
import styled from 'styled-components'
import { colors } from '@config/theme'
import { motion } from 'framer-motion'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgetPassword from './ForgetPassword'
import EmailError from './EmailError'
import EmailSent from './EmailSent'

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AuthForm = styled.div`
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

const Logo = styled(Img)`
  @media (max-height: 750px) {
    height: 15vh;
    margin: 0 0 3vh 0;
  }
`

const SelectionDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
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

const Option = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.selected ? '#eee' : 'transparent')};
  border-radius: 10px 10px 0 0;
`
type ModalState =
  | 'login'
  | 'register'
  | 'forgetPassword'
  | 'emailerror'
  | 'emailsent'

interface AuthModalProps {
  selected: ModalState
}

export default function AuthModal({
  selected = 'login',
}: AuthModalProps): JSX.Element {
  const [selectedState, setSelectedState] = useState<ModalState>(selected)
  const { closeModal } = useModal()

  return (
    <AuthDiv>
      <Logo
        src="/imagotipo2.svg"
        width="100%"
        height="10rem"
        margin="0 0 3rem 0"
        onClick={closeModal}
      />
      <AuthForm>
        <SelectionDiv>
          <div>
            <Option
              onClick={() => {
                setSelectedState('login')
              }}
              selected={selectedState === 'login'}
            >
              <Text
                color="secondary"
                textAlign="center"
                fontSize="1.5rem"
                margin="0.5rem 0 0.5rem 0"
                userSelect="none"
                cursor="pointer"
              >
                Login
              </Text>
            </Option>
            {selectedState === 'login' && <Underline layoutId="underline" />}
          </div>
          <div>
            <Option
              onClick={() => {
                setSelectedState('register')
              }}
              selected={selectedState === 'register'}
            >
              <Text
                color="secondary"
                textAlign="center"
                fontSize="1.5rem"
                margin="0.5rem 0 0.5rem 0"
                userSelect="none"
                cursor="pointer"
              >
                Register
              </Text>
            </Option>
            {selectedState === 'register' && <Underline layoutId="underline" />}
          </div>
        </SelectionDiv>
        <StyledMotionDiv state={selectedState}>
          {selectedState === 'login' && (
            <LoginForm setState={setSelectedState} />
          )}
          {selectedState === 'register' && <RegisterForm />}
          {selectedState === 'forgetPassword' && (
            <ForgetPassword setState={setSelectedState} />
          )}
          {selectedState === 'emailerror' && <EmailError />}
          {selectedState === 'emailsent' && <EmailSent />}
        </StyledMotionDiv>
      </AuthForm>
    </AuthDiv>
  )
}
