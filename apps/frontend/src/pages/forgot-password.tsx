import publicContent from '@middleware/publicContent'
import publicContentSSR from '@middleware/publicContentSSR'
import ForgotPassword from '@views/ForgotPassword'
import Head from 'next/head'

function Page(): JSX.Element {
  return (
    <>
      <Head>
        <title>He olvidado mi contraseña | Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <ForgotPassword />
    </>
  )
}

export default publicContent(Page)

export const getServerSideProps = publicContentSSR(async ({ helper }) => {
  return { props: {} }
})
