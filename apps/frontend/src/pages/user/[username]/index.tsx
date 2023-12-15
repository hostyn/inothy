import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { trpc } from '@services/trpc'
import UserView from '@views/User'

interface UserPageProps {
  username: string
}

function UserPage({ username }: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({
    username,
  })

  return (
    <>
      <Head>
        <title>@{userData?.username} - Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UserView username={username} />
    </>
  )
}

export const getServerSideProps = publicContentSSR(async ctx => {
  const username = ctx.params?.username as string
  if (username == null) {
    return {
      notFound: true,
    }
  }

  try {
    await ctx.helper.user.getUser.prefetch({
      username,
    })

    await ctx.helper.user.getDocuments.prefetchInfinite({ username })

    return {
      props: {
        username,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
})

export default publicContent(UserPage)
