/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H1 } from '../ui/Title'
import { P } from '../ui/P'

export default function Hero(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minH: 'max(var(--minHeight), 700px)',
        textAlign: 'center',
        gap: '3xl',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'lg',
        })}
      >
        <H1>APRUEBA Y GANA DINERO EN UN CLIC</H1>
        <P>Obtén dinero con tus apuntes y aprueba con el mejor material.</P>
      </div>
      <ButtonLink href="/register" visual="action" size="lg">
        Registrarse
      </ButtonLink>
      <img
        alt="Vista aérea de un escritorio blanco con una laptop abierta, una mano tecleando, y otra mano escribiendo en un cuaderno de notas, acompañado de lápices y decoración de oficina"
        src="/static/home/hero.webp"
        className={css({
          width: '100%',
          borderRadius: '10px',
        })}
      />
    </section>
  )
}
