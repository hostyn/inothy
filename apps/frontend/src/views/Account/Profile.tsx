import AccountLayout from './layouts/AccountLayout'
import UsernameSection from './components/UsernameSection'
import DescriptionSection from './components/DescriptionSection'

export default function Profile(): JSX.Element {
  return (
    <AccountLayout selected="profile">
      <UsernameSection />
      <DescriptionSection />
    </AccountLayout>
  )
}
