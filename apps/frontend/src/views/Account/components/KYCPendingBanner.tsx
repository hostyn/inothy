import { css } from '@styled-system/css'

export default function KYCPendingBanner(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'sm',
        p: 'md',
        color: 'text',
        bg: 'grey.100',
        borderRadius: 'md',
      })}
    >
      <div>
        <h2
          className={css({
            fontWeight: '700',
          })}
        >
          Estamos verificando tu identidad
        </h2>
        <p>
          Tu cuenta está en proceso de verificación. Te avisaremos cuando esté
          lista.
        </p>
      </div>
    </section>
  )
}
