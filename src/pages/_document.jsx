import Document, { Html, Main, NextScript, Head } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="Inothy"></meta>
          <meta
            name="description"
            content="Compra y vende tus apuntes con comisiones bajas."
          ></meta>
          <meta
            name="keywords"
            content="apuntes, compra, venta, comisiones"
          ></meta>
          <meta name="robots" content="index, follow"></meta>

          <link rel="icon" href="/favicon.ico" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link rel="apple-touch-icon" href="/icon.png" />

          <meta property="og:title" content="Inothy" />
          <meta
            property="og:description"
            content="Compra y vende tus apuntes con comisiones bajas."
          />
          <meta property="og:locale" content="es_ES" />
          <meta property="og:image" content="/icon.png" />

          <meta property="twitter:title" content="Inothy" />
          <meta
            property="twitter:description"
            content="Compra y vende tus apuntes con comisiones bajas."
          />

          <meta
            name="facebook-domain-verification"
            content="lwd1jg3pvse7ux8e4asxl0aw4c40qy"
          />
          {/* <meta property="twitter:image" content="/icon.png" /> */}

          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap"
            rel="stylesheet"
          ></link>

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
