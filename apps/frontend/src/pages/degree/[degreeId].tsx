import publicContent from '@middleware/publicContent'
import publicContentSSR from '@middleware/publicContentSSR'

function Page(): JSX.Element {
  return <h1>degree</h1>
}

export default publicContent(Page)

export const getServerSideProps = publicContentSSR(async ({ query }) => {
  const { degreeId } = query

  if (typeof degreeId !== 'string') {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
})
