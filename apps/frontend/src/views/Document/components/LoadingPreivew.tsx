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
    </div>
  )
}
