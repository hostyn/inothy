import { PageSpacing } from './PageSpacing'
import SearchBar from './SearchBar'
import { Separator } from './Separator'
import { css } from '@styled-system/css'
import { type IconType } from 'react-icons'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  Icon: IconType
  searchBar?: boolean
}

export default function PageLayout({
  children,
  title,
  Icon,
  searchBar = false,
}: PageLayoutProps): JSX.Element {
  return (
    <PageSpacing>
      <header
        className={css({
          py: 'md',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <Icon size={24} className={css({ color: 'primary.500' })} />
          <h1 className={css({ fontSize: 'xl', color: 'primary.500' })}>
            {title}
          </h1>
        </div>
        {searchBar && <SearchBar />}
      </header>

      <Separator
        className={css({
          mb: 'md',
        })}
      />

      {children}
    </PageSpacing>
  )
}
