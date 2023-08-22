import { Content as TabsContent } from '@radix-ui/react-tabs'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'

interface TabContentProps {
  children: React.ReactNode
  value: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  first?: boolean
  prev?: () => void
  title?: string
}

export default function TabContent({
  children,
  value,
  onSubmit,
  first = false,
  prev,
  title,
}: TabContentProps): JSX.Element {
  return (
    <TabsContent value={value} className={tabsContentStyles} tabIndex={-1}>
      <form
        onSubmit={onSubmit}
        className={css({
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'inherit',
          width: '100%',
        })}
      >
        <div
          id="content"
          className={css({
            flex: 1,
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5xl',
          })}
        >
          {children}
        </div>

        <div id="progress">
          <div
            className={css({
              height: '4px',
              bg: 'grey.100',
            })}
          ></div>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '6rem 1fr 6rem',
              alignItems: 'center',
              justifyContent: 'center',
              my: 'md',
            })}
          >
            {prev != null ? (
              <Button visual="secondary" type="button" onClick={prev}>
                Anterior
              </Button>
            ) : (
              <div />
            )}
            {title != null ? (
              <span
                className={css({
                  color: 'grey.500',
                  textAlign: 'center',
                })}
              >
                {title}
              </span>
            ) : (
              <div />
            )}
            <Button>{first ? 'Empezar' : 'Siguiente'}</Button>
          </div>
        </div>
      </form>
    </TabsContent>
  )
}

const tabsContentStyles = css({
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: 'inherit',
  display: 'none',

  _focus: {
    outline: 'none',
  },

  '&[data-state="active"]': {
    display: 'flex',
  },

  '&[data-state="inactive"] #progress': {
    opacity: 0,
  },

  '&[data-state="inactive"]': {
    animation: 'tabsDisplay 400ms ease-in-out',
  },

  '&[data-state="active"] #content': {
    animation: 'tabsShow 400ms ease-in-out',
  },

  '&[data-state="inactive"] #content': {
    animation: 'tabsHide 400ms ease-in-out',
  },
})
