import protectedContent from '@middleware/protectedContent'
import protectedContentSSR from '@middleware/protectedContentSSR'

function Checkout(): JSX.Element {
  return <></>
}

export default protectedContent(Checkout)

export const getServerSideProps = protectedContentSSR(async () => {
  return { redirect: { destination: '/', permanent: false } }
})
