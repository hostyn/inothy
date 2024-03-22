import PasswordSectionWithPasswordSet from './PasswordSectionWithPasswordSet'
import PasswordSectionWithoutPasswordSet from './PasswordSectionWithoutPasswordSet'
import { auth } from '@config/firebase'

export default function PasswordSection(): JSX.Element {
  const userHasPassword =
    auth.currentUser?.providerData.some(
      item => item.providerId === 'password'
    ) ?? false

  return userHasPassword ? (
    <PasswordSectionWithPasswordSet />
  ) : (
    <PasswordSectionWithoutPasswordSet />
  )
}
