import { createGlobalStyle } from "styled-components";
import FacebookPixel from "../components/FacebookPixel";
import TikTokPixel from "../components/TikTokPixel";
import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";

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

`;

export default function Providers({ children, headers }) {
  return (
    <>
      <GlobalStyle />
      <TikTokPixel />
      <FacebookPixel />
      <AuthProvider headers={headers}>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </>
  );
}
