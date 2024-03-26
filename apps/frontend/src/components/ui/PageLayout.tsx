import { PageSpacing } from './PageSpacing'
import { Separator } from './Separator'
import { css } from '@styled-system/css'
import { type IconType } from 'react-icons'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  Icon: IconType
  rightElement?: React.ReactNode
}

export default function PageLayout({
  children,
  title,
  Icon,
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'md',
          py: 'md',
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
          <Icon
            className={css({
              color: 'primary.500',
              width: '24px',
              height: '24px',

              md: {
                height: '32px',
                width: '32px',
              },
            })}
          />
          <h1
            title={title}
            className={css({
              fontSize: 'lg',
              color: 'primary.500',
              fontWeight: '600',
              lineHeight: '110%',
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineClamp: 2,
              width: '100%',

              md: {
                fontSize: 'xl',
              },
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
