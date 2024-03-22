import protectedContentSSR from '@middleware/protectedContentSSR'

export default function Account(): JSX.Element {
  return <></>
}

export const getServerSideProps = protectedContentSSR(async () => ({
  redirect: { permanent: true, destination: '/account/general' },
}))
