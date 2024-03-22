import { PageSpacing } from './PageSpacing'
import { Separator } from './Separator'
import { css } from '@styled-system/css'
import { type IconType } from 'react-icons'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  Icon: IconType
  searchBar?: boolean
  rightElement?: React.ReactNode
}

export default function PageLayout({
  children,
  title,
  Icon,
  searchBar = false,
  rightElement,
}: PageLayoutProps): JSX.Element {
  return (
    <PageSpacing
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
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
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <Icon size={32} className={css({ color: 'primary.500' })} />
          <h1
            title={title}
            className={css({
              fontSize: 'xl',
              color: 'primary.500',
              fontWeight: '600',
              lineHeight: '110%',
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineClamp: 2,
              width: '100%',
            })}
          >
            {title}
          </h1>
        </div>
        {rightElement}
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
