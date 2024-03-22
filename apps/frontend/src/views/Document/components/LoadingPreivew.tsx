import Logo from '@components/Logo'
import Spinner from '@components/Spinner'
import { css } from '@styled-system/css'

export default function LoadingPreview(): JSX.Element {
  return (
    <div
      className={css({
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'sm',
        color: 'grey.500',
        fontWeight: '600',
      })}
    >
      <Spinner className={css({ stroke: 'grey.500', fontSize: 'lg' })} />
      <span>Cargando previsualización</span>
      <div
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(16deg)',
          width: '100%',
          opacity: '0.1',
          zIndex: '-1',
        })}
      >
        <Logo width="100%" />
      </div>
    </div>
  )
}
