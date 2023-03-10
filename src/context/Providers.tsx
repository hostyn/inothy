import { type IncomingHttpHeaders } from 'http2'
import { Toaster } from 'sonner'
import { createGlobalStyle } from 'styled-components'
import FacebookPixel from '../components/FacebookPixel'
import TikTokPixel from '../components/TikTokPixel'
import { AuthProvider } from './authContext'
import { ModalProvider } from './modalContext'

interface ProvidersProps {
  children: JSX.Element | JSX.Element[]
  headers: IncomingHttpHeaders
}

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    overflow-y: overlay;
    font-family: "VarelaRound";
  }


  .modal-open {
    overflow-y: hidden;
  }

`

export default function Providers({
  children,
  headers,
}: ProvidersProps): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <TikTokPixel />
      <FacebookPixel />
      <Toaster
        position="top-right"
        expand
        richColors
        visibleToasts={4}
        closeButton
        style={{ fontFamily: 'VarelaRound' }}
      />
      <AuthProvider headers={headers}>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </>
  )
}
