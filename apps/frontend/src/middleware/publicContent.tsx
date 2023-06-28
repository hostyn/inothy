import { withAuthUser } from 'next-firebase-auth'
import { type ComponentType } from 'react'

const publicContent = (Component: ComponentType<any>): ComponentType =>
  withAuthUser()(Component)

export default publicContent
