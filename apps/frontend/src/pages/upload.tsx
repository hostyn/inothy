import Head from 'next/head'
import protectedContentSSR from '@middleware/protectedContentSSR'
import protectedContent from '@middleware/protectedContent'
import Upload from '@views/Upload'

function Page(): JSX.Element {
  return (
    <>
      <Head>
        <title>Subir archivos - Inothy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Upload />
    </>
  )
}

export default protectedContent(Page)

export const getServerSideProps = protectedContentSSR()
