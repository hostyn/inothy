import { useServerSideHelper } from '@hooks/useServerSideHelper'
import type {
  GetServerSidePropsResult,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next'
import { type AuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'

type FirebaseAuthParams = Parameters<typeof withAuthUserTokenSSR>[0]

const withAuthUserSSR = <Type,>(firebaseAuthParams?: FirebaseAuthParams) => {
  return (
    getServerSideProps?: (
      ctx: GetServerSidePropsContext & {
        AuthUser: AuthUser
        helper: ReturnType<typeof useServerSideHelper>
      }
    ) => Promise<GetServerSidePropsResult<Type>>
  ): GetServerSideProps => {
    return withAuthUserTokenSSR(firebaseAuthParams)(async ctx => {
      const helper = useServerSideHelper(ctx.AuthUser, ctx.req.headers)

      const getUserDataPrefetch = helper.auth.getUserData.prefetch()

      if (getServerSideProps == null) {
        await getUserDataPrefetch
        return {
          props: {
            trpcState: helper.dehydrate(),
          },
        }
      }

      const res = await getServerSideProps({ ...ctx, helper })
      await getUserDataPrefetch

      if ('props' in res) {
        return {
          props: {
            ...res.props,
            trpcState: helper.dehydrate(),
          },
        }
      }

      return res
    })
  }
}

export default withAuthUserSSR
