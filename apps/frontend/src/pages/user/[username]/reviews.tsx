import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { trpc } from '@services/trpc'
import UserViewReviews from '@views/User/Reviews'

interface UserPageProps {
  username: string
}

function UserPageReviews({ username }: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({
    username,
  })

  return (
    <>
      <Head>
        <title>@{userData?.username} - Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UserViewReviews username={username} />
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
    await ctx.helper.user.getUser.fetch({
      username,
    })
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

export default publicContent(UserPageReviews)
