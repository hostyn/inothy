import styled from 'styled-components'
import Footer from './Footer'
import Nav from './Navbar'
import { sizes } from '@config/theme'
import useBanner, { BannerProvider } from '@context/bannerContext'

interface AppProps {
  children: JSX.Element | JSX.Element[]
  transparent?: boolean
}

interface AppBodyProps {
  transparent: boolean
  isBanner: boolean
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
  min-height: ${props =>
    props.isBanner ? `calc(100vh - ${sizes.banner})` : '100vh'};
  padding: ${props => (props.transparent ? '0' : `${sizes.navbar} 0 0 0`)};
  display: flex;
  flex-direction: column;
`

export default function App({
  children,
  transparent = false,
}: AppProps): JSX.Element {
  const { isBanner } = useBanner()
  return (
    <AppDiv>
      <BannerProvider>
        <Nav transparent={transparent} />
        <AppBody transparent={transparent} isBanner={isBanner}>
          {children}
        </AppBody>
        <Footer />
      </BannerProvider>
    </AppDiv>
  )
}
