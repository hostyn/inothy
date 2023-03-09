import styled from 'styled-components'
import Footer from './Footer'
import Nav from './Navbar'
import { sizes } from '@config/theme'
import { useAuth } from '@context/authContext'

interface AppProps {
  children: JSX.Element | JSX.Element[]
  transparent?: boolean
}

interface AppBodyProps {
  transparent: boolean
  notVerified: boolean
}

const AppDiv = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background-color: white;
`

const AppBody = styled.main<AppBodyProps>`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  ${props =>
    props.transparent
      ? 'padding: 0'
      : props.notVerified
      ? `padding: calc(${sizes.navbar} + ${sizes.banner}) 0 0 0`
      : `padding: ${sizes.navbar} 0 0 0`};
`

export default function App({
  children,
  transparent = false,
}: AppProps): JSX.Element {
  const { user } = useAuth()
  return (
    <AppDiv>
      <Nav transparent={transparent} />
      <AppBody
        transparent={transparent}
        notVerified={user != null && !user.emailVerified}
      >
        {children}
      </AppBody>
      <Footer />
    </AppDiv>
  )
}
