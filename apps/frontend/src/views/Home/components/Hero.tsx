/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H1 } from '@ui/Title'

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
        <p
          className={css({
            fontSize: '2xl',
            fontFamily: 'nunitoSans',
            lineHeight: '1.3',
            color: 'text',
          })}
        >
          Obtén dinero con tus apuntes y aprueba con el mejor material.
        </p>
      </div>
      <ButtonLink href="/register" visual="action" size="lg">
        Registrarse
      </ButtonLink>
      <img
        src="/static/home/hero.webp"
        className={css({
          width: '100%',
          borderRadius: '10px',
        })}
      />
    </section>
  )
}
