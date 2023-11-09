import { useServerSideHelper } from '@hooks/useServerSideHelper'
import type {
  GetServerSidePropsResult,
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
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
      const helper = useServerSideHelper(
        ctx.req as NextApiRequest,
        ctx.AuthUser
      )

      await helper.auth.getUserData.prefetch()

      if (getServerSideProps == null) {
        return {
          props: {
            trpcState: helper.dehydrate(),
          },
        }
      }

      const res = await getServerSideProps({ ...ctx, helper })

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
