import { Button } from './Button'
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
  callToActionText?: string
  onCallToAction?: () => void
}

export default function PageLayout({
  children,
  title,
  Icon,
  searchBar = false,
  callToActionText,
  onCallToAction,
}: PageLayoutProps): JSX.Element {
  return (
    <PageSpacing>
      <header
        className={css({
          py: 'md',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'md',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <Icon size={32} className={css({ color: 'primary.500' })} />
          <h1
            className={css({
              fontSize: 'xl',
              color: 'primary.500',
              fontWeight: '600',
              lineHeight: '110%',
              letterSpacing: '-0.02em',
            })}
          >
            {title}
          </h1>
        </div>
        {searchBar && <SearchBar />}
        {onCallToAction != null && (
          <Button onClick={onCallToAction}>{callToActionText}</Button>
        )}
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
