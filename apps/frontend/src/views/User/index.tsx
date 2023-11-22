import App from '@components/App'
import { PageSpacing } from '@ui/PageSpacing'
import UserCard from './components/UserCard'
import UserMainContent from './components/UserMainContent'
import { css } from '@styled-system/css'

interface UserViewProps {
  userId: string
}

export default function UserView({ userId }: UserViewProps): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          gap: 'xl',
          alignSelf: 'stretch',
          alignItems: 'start',
        })}
      >
        <UserCard userId={userId} />
        <UserMainContent userId={userId} />
      </PageSpacing>
    </App>
  )
}
