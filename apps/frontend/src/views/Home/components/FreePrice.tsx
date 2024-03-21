/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '@ui/Title'

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
          left: '0',
          right: '0',
          bottom: '0',
          bg: 'grey.100',
          width: '100%',
          height: '90%',
          borderRadius: '15px',
        },
      })}
    >
      <img
        src="/static/home/pig.webp"
        alt="Precio gratis"
        className={css({ height: '400px', objectFit: 'cover' })}
      />
      <H2 textAlign="center">AL PRECIO QUE QUIERAS</H2>
      <p
        className={css({
          fontSize: '2xl',
          fontFamily: 'nunitoSans',
          lineHeight: '1.3',
          color: 'text',
          width: '40ch',
          textAlign: 'center',
        })}
      >
        Si tienes buenos apuntes, véndelos por lo que valen. Monetiza y
        rentabiliza tu conocimiento.
      </p>
      <ButtonLink href="/register" visual="action" size="lg">
        Vender apuntes
      </ButtonLink>
    </section>
  )
}
