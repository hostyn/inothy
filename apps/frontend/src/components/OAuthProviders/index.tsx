import { auth, googleProvider } from '@config/firebase'
import { toastError } from '@services/toaster'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'

export default function OAuthProviders(): JSX.Element {
  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      if (
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        toastError('Has cancelado el inicio de sesión.')
        return
      }
      toastError('Ha ocurrido un error inesperado al iniciar sesión.')
    }
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        width: 'xl',
        gap: 'md',
      })}
    >
      <div
        className={css({
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: 'sm',
          height: '2px',
        })}
      >
        <Separator />
        <p
          className={css({
            width: 'max-content',
            textWrap: 'nowrap',
            color: 'grey.200',
          })}
        >
          o
        </p>
        <Separator />
      </div>

      <div
        className={css({
          display: 'flex',
          gap: 'sm',
        })}
      >
        <button className={oAuthButtonStyles} onClick={handleLogin}>
          <FcGoogle size={24} />
          Inicia sesión con Google
        </button>
      </div>

      <Separator />
    </div>
  )
}

const oAuthButtonStyles = css({
  borderRadius: 'md',
  bg: 'grey.100',
  color: 'text',
  height: '5xs',
  display: 'flex',
  p: 'sm',
  gap: 'sm',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition:
    'outline-width 100ms ease-in-out, background-color 100ms ease-in-out',

  _hover: {
    bg: 'grey.200',
  },

  _focus: {
    outline: '3px solid token(colors.primary.300)',
  },
})
