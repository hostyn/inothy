import App from '@components/App'
import { PageSpacing } from '@ui/PageSpacing'
import ProfileCard from './components/ProfileCard'
import ProfileMainContent from './components/ProfileMainContent'
import { css } from '@styled-system/css'

interface ProfileViewProps {
  profileId: string
}

export default function ProfileView({
  profileId,
}: ProfileViewProps): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          gap: 'xl',
        })}
      >
        <ProfileCard profileId={profileId} />
        <ProfileMainContent profileId={profileId} />
      </PageSpacing>
    </App>
  )
}
