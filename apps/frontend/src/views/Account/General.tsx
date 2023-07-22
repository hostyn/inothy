import AccountLayout from './layouts/AccountLayout'
import UsernameSection from './components/UsernameSection'
import DescriptionSection from './components/DescriptionSection'
import EmailSection from './components/EmailSection'

export default function General(): JSX.Element {
  return (
    <AccountLayout selected="general">
      <UsernameSection />
      <DescriptionSection />
      <EmailSection />
    </AccountLayout>
  )
}
