import UserReviews from './components/UserReviews'
import UserLayout, { type UserPageProps } from './layouts/UserLayout'

export default function UserViewReviews(props: UserPageProps): JSX.Element {
  return (
    <UserLayout {...props} selected="reviews">
      <UserReviews {...props} />
    </UserLayout>
  )
}
