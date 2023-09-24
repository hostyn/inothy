import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <meta name="title" content="Inothy - Prepárate para aprobar"></meta>
        <meta
          name="description"
          content="PREPÁRATE PARA APROBAR: Compra y vende tus apuntes de la universidad en Inothy. Las comisiones más bajas del mercado y los pagos más rápidos que vas a encontrar."
        ></meta>
        <meta
          name="keywords"
          content="apuntes, compra, venta, comisiones"
        ></meta>
        <meta name="author" content="Inothy" />

        <meta property="og:title" content="Inothy - Prepárate para aprobar" />
        <meta
          property="og:description"
          content="PREPÁRATE PARA APROBAR: Compra y vende tus apuntes de la universidad en Inothy. Las comisiones más bajas del mercado y los pagos más rápidos que vas a encontrar."
        />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content="/imagotipo.png" />

        <meta
          property="twitter:title"
          content="Inothy - Prepárate para aprobar"
        />
        <meta
          property="twitter:description"
          content="PREPÁRATE PARA APROBAR: Compra y vende tus apuntes de la universidad en Inothy. Las comisiones más bajas del mercado y los pagos más rápidos que vas a encontrar."
        />

        {/* --------- FAVICONS --------- */}

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />

        {/* --------------------------- */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
