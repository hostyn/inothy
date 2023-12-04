import UserLayout, { type UserPageProps } from './layouts/UserLayout'

export default function UserViewReviews(props: UserPageProps): JSX.Element {
  return (
    <UserLayout {...props} selected="reviews">
      <h1>reviews</h1>
    </UserLayout>
  )
}
