import { type GetServerSideProps } from 'next'

export default function Account(): JSX.Element {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { permanent: true, destination: '/account/general' } }
}
