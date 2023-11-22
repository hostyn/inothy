import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { trpc } from '@services/trpc'
import UserView from '@views/User'

interface UserPageProps {
  userId: string
}

function UserPage({ userId }: UserPageProps): JSX.Element {
  const { data: userData } = trpc.user.getUser.useQuery({
    id: userId,
  })

  return (
    <>
      <Head>
        <title>{userData?.username} - Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <UserView userId={userId} />
    </>
  )
}

export const getServerSideProps = publicContentSSR(async ctx => {
  const userId = ctx.params?.userId as string
  if (userId == null) {
    return {
      notFound: true,
    }
  }
  try {
    await ctx.helper.user.getUser.fetch({
      id: userId,
    })
    return {
      props: {
        userId,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
})

export default publicContent(UserPage)
