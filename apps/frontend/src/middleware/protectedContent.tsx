import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { type ComponentType } from 'react'

const protectedContent = (Component: ComponentType<any>): ComponentType =>
  withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(Component)

export default protectedContent
