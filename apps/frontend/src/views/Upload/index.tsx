import App from '@components/App'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import { PageSpacing } from '@ui/PageSpacing'

export default function Upload(): JSX.Element {
  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          })}
        >
          <h1
            className={css({
              fontSize: '5xl',
              fontFamily: 'var(--nunito-sans)',
            })}
          >
            Subir tus apuntes <br /> es muy sencillo
          </h1>
        </div>
        <div
          className={css({
            height: '4px',
            bg: 'grey.100',
          })}
        ></div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
            my: 'md',
          })}
        >
          <Button>Empezar</Button>
        </div>
      </PageSpacing>
    </App>
  )
}
