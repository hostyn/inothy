/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '../ui/Title'
import { P } from '../ui/P'

export default function MakeMoney(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column-reverse',
        gap: '4xl',

        lg: {
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '0',
        },
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
        <P textAlign="left">
          Sube tus apuntes al precio que quieras y empieza a generar ingresos
          vendiendo con bajas comisiones.
        </P>
        <ButtonLink href="/register" visual="action" size="lg">
          Registrarse
        </ButtonLink>
      </div>
      <div
        className={css({
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'left',

          lg: {
            justifyContent: 'right',
          },
        })}
      >
        <img
          src="/static/home/make-money-mockup.webp"
          alt="Gana dinero"
          className={css({
            position: 'absolute',
            borderRadius: 'md',
            width: '80%',
            bottom: '0',
            right: '0',

            lg: {
              width: '100%',
              bottom: '0',
              top: 'unset',
              left: '0',
            },
          })}
        />
        <img
          src="/static/home/make-money-stock.webp"
          alt="Gana dinero"
          className={css({
            height: '100%',
            maxH: '50rem',
            borderRadius: 'md',

            lg: {
              width: '80%',
            },
          })}
        />
      </div>
    </section>
  )
}
