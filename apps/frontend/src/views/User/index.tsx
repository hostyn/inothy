import UserDocuments from './components/UserDocuments'
import UserLayout, { type UserPageProps } from './layouts/UserLayout'

export default function UserView(props: UserPageProps): JSX.Element {
  return (
    <UserLayout {...props}>
      <UserDocuments {...props} />
    </UserLayout>
  )
}
