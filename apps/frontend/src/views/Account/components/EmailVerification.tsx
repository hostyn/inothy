import { toastError } from '@services/toaster'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'

export default function EmailVerification(): JSX.Element {
  const resendVerificationEmail = trpc.auth.sendVerificationEmail.useMutation({
    onError: error => {
      if (error.message !== 'already-verified') {
        toastError('Ya has verificado tu email.')
        return
      }

      toastError('Error al reenviar el email. Vuelve a intentarlo más tarde.')
    },
  })

  const handleResendVerificationEmail = (): void => {
    resendVerificationEmail.mutate()
  }

  return (
    <div
      className={css({
        border: '2px solid token(colors.grey.100)',
        borderRadius: 'md',
        p: 'md',
        bg: 'grey.100',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <h2 className={css({ color: 'text', fontWeight: '600' })}>
          Aún no has verificado tu email.
        </h2>
        <p
          className={css({
            fontSize: 'sm',
            color: 'text',
          })}
        >
          Verifica tu email para mantener tu cuenta segura.
        </p>
      </div>
      <Button onClick={handleResendVerificationEmail}>Reenviar enlace</Button>
    </div>
  )
}
