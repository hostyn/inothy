import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { type ComponentType } from 'react'

const authContent = (Component: ComponentType<any>): ComponentType =>
  withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
  })(Component)

export default authContent
