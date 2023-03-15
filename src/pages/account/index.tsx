import { type GetServerSideProps } from 'next'
import LoadingPage from '@components/LoadingPage'

export default function Account(): JSX.Element {
  return <LoadingPage />
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { permanent: true, destination: '/account/profile' } }
}
