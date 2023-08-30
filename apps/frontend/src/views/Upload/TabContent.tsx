import Spinner from '@components/Spinner'
import { Content as TabsContent } from '@radix-ui/react-tabs'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import type { Step } from './types'

interface TabContentProps {
  children: React.ReactNode
  value: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  first?: boolean
  prev?: () => void
  title?: string
  loading?: boolean
  disabled?: boolean
  steps?: Step[]
}

export default function TabContent({
  children,
  value,
  onSubmit,
  first = false,
  prev,
  title,
  loading = false,
  disabled = false,
  steps,
}: TabContentProps): JSX.Element {
  return (
    <TabsContent value={value} className={tabsContentStyles} tabIndex={-1}>
      <form
        noValidate
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
          {steps == null ? (
            <div
              className={css({
                height: '4px',
                bg: 'grey.100',
              })}
            ></div>
          ) : (
            <div
              className={css({
                height: '4px',
                display: 'grid',
                gap: 'xs',
              })}
              style={{
                gridTemplateColumns: steps
                  .map(stepGroup => `${stepGroup.steps.length}fr`)
                  .join(' '),
              }}
            >
              {/* TODO: Limpiar las animación */}
              {steps.map(stepGroup => {
                const [stepNumber, substepNumber] = value.split('.').map(Number)
                return (
                  <div
                    key={stepGroup.number}
                    className={css({
                      display: 'flex',
                      bg: 'grey.100',
                    })}
                  >
                    {stepGroup.steps.map((step, index) => (
                      <div
                        key={`${stepGroup.number}.${index}`}
                        className={css({
                          height: '100%',
                          width: '100%',
                          bg:
                            stepGroup.number < stepNumber
                              ? 'primary.500'
                              : stepGroup.number === stepNumber
                              ? index <= substepNumber
                                ? 'primary.500'
                                : 'grey.100'
                              : 'grey.100',
                          animation:
                            stepGroup.number === stepNumber &&
                            index === substepNumber
                              ? 'progressStart 1s ease'
                              : 'none',
                        })}
                      ></div>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
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
            <Button
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: loading ? 'calc(token(fontSizes.md) * 1.5)' : 'md',
              })}
              disabled={loading || disabled}
            >
              {loading ? <Spinner /> : first ? 'Empezar' : 'Siguiente'}
            </Button>
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
