import { css } from '@styled-system/css'
import posthog from 'posthog-js'
import { useEffect, useState } from 'react'

export default function CookieBanner(): JSX.Element {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(
      !posthog.has_opted_in_capturing() && !posthog.has_opted_out_capturing()
    )
  }, [])

  return (
    <div
      className={css({
        position: 'fixed',
        display: show ? 'flex' : 'none',
        flexDirection: 'column',
        bottom: '1rem',
        right: '1rem',
        bg: 'grey.100',
        p: 'md',
        borderRadius: 'md',
        gap: 'sm',
        color: 'grey.600',
        maxW: 'calc(100vw - 2rem)',
      })}
    >
      <span
        className={css({
          fontWeight: '700',
          lineHeight: '1',
        })}
      >
        Este sitio utiliza cookies
      </span>
      <p
        className={css({
          maxW: '40ch',
          fontSize: 'sm',
          textWrap: 'wrap',
        })}
      >
        Haciendo click en cualquier sitio o haciendo click en
        &quot;Aceptar&quot;, confirmas que accedes al uso de cookies.
      </p>
      <button
        type="button"
        onClick={() => {
          setShow(false)
          posthog.opt_in_capturing()
        }}
        className={css({
          fontWeight: 'bold',
          fontSize: 'lg',
          bg: 'primary.400',
          color: 'white',
          p: 'sm',
          borderRadius: 'md',
          transition: 'background-color 150ms ease-in-out',

          _hover: {
            bg: 'primary.500',
          },
        })}
      >
        Aceptar
      </button>
      <button
        onClick={() => {
          setShow(false)
          posthog.opt_out_capturing()
        }}
        className={css({
          fontSize: 'xs',
          _hover: {
            textDecoration: 'underline',
          },
        })}
      >
        No quiero que este sitio trate mis datos personales
      </button>
    </div>
  )
}
