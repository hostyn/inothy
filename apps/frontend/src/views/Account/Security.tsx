import EmailSection from './components/EmailSection'
import PasswordSection from './components/PasswordSection'
import AccountLayout from './layouts/AccountLayout'

export default function Security(): JSX.Element {
  return (
    <AccountLayout selected="security">
      <EmailSection />
      <PasswordSection />
    </AccountLayout>
  )
}
