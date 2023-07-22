import { AuthAction } from 'next-firebase-auth'
import withAuthUserSSR from './withAuthUserSSR'

const protectedContentSSR = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})

export default protectedContentSSR
