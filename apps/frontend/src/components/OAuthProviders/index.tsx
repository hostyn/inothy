import { auth, googleProvider } from '@config/firebase'
import { css } from '@styled-system/css'
import { Separator } from '@ui/Separator'
import { signInWithRedirect } from 'firebase/auth'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

const oAuthButtonStyles = css({
  borderRadius: '10000rem',
  bg: 'grey.100',
  width: '5xs',
  height: '5xs',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  _hover: {
    bg: 'grey.200',
  },

  _focus: {
    outline: '3px solid token(colors.primary.300)',
  },
})

export default function OAuthProviders({
  text,
}: {
  text: string
}): JSX.Element {
  const handleGoogleLogin = async (): Promise<void> => {
    await signInWithRedirect(auth, googleProvider)
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
          {text} con
        </p>
        <Separator />
      </div>

      <div
        className={css({
          display: 'flex',
          gap: 'sm',
        })}
      >
        <button className={oAuthButtonStyles} onClick={handleGoogleLogin}>
          <FcGoogle size={24} />
        </button>

        <div className={oAuthButtonStyles}>
          <AiOutlineTwitter size={24} className={css({ fill: '#1DA1F2' })} />
        </div>

        <div className={oAuthButtonStyles}>
          <BsFacebook size={24} className={css({ fill: '#3b5998' })} />
        </div>
      </div>

      <Separator />
    </div>
  )
}
