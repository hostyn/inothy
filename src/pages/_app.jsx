import App from "next/app";
import { createGlobalStyle } from "styled-components";
import Cookies from "../components/Cookies";
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

export default function MyApp({ Component, pageProps }) {
  return (
    <Providers headers={pageProps.headers}>
      <GlobalStyle />
      <Cookies />
      <Component {...pageProps} />
    </Providers>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return {
    pageProps: {
      ...appProps.pageProps,
      headers: appContext.ctx.req.headers,
    },
  };
};
