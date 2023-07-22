import { AuthAction } from 'next-firebase-auth'
import withAuthUserSSR from './withAuthUserSSR'

const authContentSSR = withAuthUserSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})

export default authContentSSR
