import LoadingPage from '@components/LoadingPage'
import { type GetServerSideProps } from 'next'

export default function Account(): JSX.Element {
  return <LoadingPage />
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { permanent: true, destination: '/account/profile' } }
}
