import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'

export default function KYCNeededBanner(): JSX.Element {
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
          Debes verificar tu identidad
        </h2>
        <p
          className={css({
            maxWidth: '50ch',
          })}
        >
          Para poder retirar tu dinero, necesitamos verificar tu identidad.
        </p>
      </div>
      <ButtonLink
        className={css({
          textWrap: 'nowrap',
        })}
        href="/kyc"
      >
        Verificar{' '}
        <span
          className={css({
            display: 'none',
            md: { display: 'inline' },
          })}
        >
          identidad
        </span>
      </ButtonLink>
    </section>
  )
}
