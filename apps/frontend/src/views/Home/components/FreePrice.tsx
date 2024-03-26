/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '../ui/Title'
import { P } from '../ui/P'

export default function FreePrice(): JSX.Element {
  return (
    <section
      className={css({
        position: 'relative',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'xl',
        pb: '6xl',

        _before: {
          position: 'absolute',
          content: '""',
          zIndex: -1,
          bottom: '0',
          left: '-calc(1.5rem - 0.375rem)',
          bg: 'grey.100',
          width: 'calc(100vw - 0.75rem)',
          height: '90%',
          borderRadius: '15px',

          md: {
            width: '100%',
            left: '0',
          },
        },
      })}
    >
      <img
        src="/static/home/pig.webp"
        alt="Precio gratis"
        className={css({
          height: '250px',
          objectFit: 'cover',
          md: {
            height: '400px',
          },
        })}
      />
      <H2 textAlign="center">AL PRECIO QUE QUIERAS</H2>
      <P>
        Si tienes buenos apuntes, véndelos por lo que valen. Monetiza y
        rentabiliza tu conocimiento.
      </P>
      <ButtonLink href="/register" visual="action" size="lg">
        Vender apuntes
      </ButtonLink>
    </section>
  )
}
