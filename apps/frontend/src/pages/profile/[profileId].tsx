import Head from 'next/head'
import publicContentSSR from '@middleware/publicContentSSR'
import publicContent from '@middleware/publicContent'
import { trpc } from '@services/trpc'
import ProfileView from '@views/Profile'

interface ProfilePageProps {
  profileId: string
}

function ProfilePage({ profileId }: ProfilePageProps): JSX.Element {
  const { data: profileData } = trpc.profile.getProfile.useQuery({
    id: profileId,
  })

  return (
    <>
      <Head>
        <title>{profileData?.username} - Inothy</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <ProfileView profileId={profileId} />
    </>
  )
}

export const getServerSideProps = publicContentSSR(async ctx => {
  const profileId = ctx.params?.profileId as string
  if (profileId == null) {
    return {
      notFound: true,
    }
  }
  try {
    await ctx.helper.profile.getProfile.fetch({
      id: profileId,
    })
    return {
      props: {
        profileId,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
})

export default publicContent(ProfilePage)
