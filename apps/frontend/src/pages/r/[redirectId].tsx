import type { GetStaticProps, GetStaticPaths } from 'next'

const REDIRECTS = [
  {
    id: 'ig',
    url: 'https://inothy.com/?utm_source=instagram&utm_medium=bio&utm_campaign=none',
  },
  {
    id: 'tt',
    url: 'https://inothy.com/?utm_source=tiktok&utm_medium=bio&utm_campaign=none',
  },
]

export default function Redirect(): JSX.Element {
  return <></>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: REDIRECTS.map(({ id }) => ({ params: { redirectId: id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { redirectId } = params as { redirectId: string }

  return {
    redirect: {
      destination: REDIRECTS.find(({ id }) => id === redirectId)?.url ?? '/',
      permanent: false,
    },
  }
}
