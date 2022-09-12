import { createGlobalStyle } from "styled-components";
import Providers from "../context/Providers";
import "../styles/global.css";

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

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <GlobalStyle />
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
