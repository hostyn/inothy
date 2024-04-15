import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <meta name="title" content="Inothy - Prepárate para aprobar"></meta>
        <meta
          name="description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>

        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content="Inothy - Prepárate para aprobar"
        ></meta>
        <meta
          property="og:description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>
        <meta
          key="og:image"
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/og.png`}
        ></meta>

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:domain" content="vercel.com"></meta>
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_FRONTEND_URL}
        ></meta>
        <meta
          name="twitter:title"
          content="Inothy - Prepárate para aprobar"
        ></meta>
        <meta
          name="twitter:description"
          content="Compra los mejores apuntes y gana dinero vendiendo los tuyos."
        ></meta>
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/og.png`}
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
