import { useServerSideHelper } from '@hooks/useServerSideHelper'
import type {
  GetServerSidePropsResult,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next'
import {
  type AuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'

const protectedContentSSR = <Type,>(
  getServerSideProps?: (
    ctx: GetServerSidePropsContext & {
      AuthUser: AuthUser
      helper: ReturnType<typeof useServerSideHelper>
    }
  ) => Promise<GetServerSidePropsResult<Type>>
): GetServerSideProps => {
  return withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  })(async ctx => {
    const helper = useServerSideHelper(ctx.AuthUser)

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

export default protectedContentSSR
