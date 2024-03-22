/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '@ui/Title'

export default function MakeMoney(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        gap: '6xl',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'xl',
        })}
      >
        <H2 textAlign="left">GANA DINERO DE VERDAD</H2>
        <p
          className={css({
            fontSize: '2xl',
            fontFamily: 'nunitoSans',
            lineHeight: '1.3',
            color: 'text',
            width: '30ch',
          })}
        >
          Sube tus apuntes al precio que quieras y empieza a generar ingresos
          vendiendo con bajas comisiones.
        </p>
        <ButtonLink href="/register" visual="action" size="lg">
          Registrarse
        </ButtonLink>
      </div>
      <img
        src="/static/home/make-money-mockup.webp"
        alt="Gana dinero"
        className={css({
          position: 'absolute',
          height: '350px',
          bottom: '0',
          right: '10%',
          borderRadius: 'md',
        })}
      />
      <img
        src="/static/home/make-money-stock.webp"
        alt="Gana dinero"
        className={css({
          height: '100%',
          borderRadius: 'md',
        })}
      />
    </section>
  )
}
