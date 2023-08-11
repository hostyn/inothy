import AccountLayout from './layouts/AccountLayout'
import UsernameSection from './components/UsernameSection'
import DescriptionSection from './components/DescriptionSection'
import EmailSection from './components/EmailSection'

export default function Profile(): JSX.Element {
  return (
    <AccountLayout selected="profile">
      <UsernameSection />
      <DescriptionSection />
      <EmailSection />
    </AccountLayout>
  )
}
