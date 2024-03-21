/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '@ui/Title'

export default function Fast(): JSX.Element {
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
      <img
        src="/static/home/fast-mockup.webp"
        alt="Gana dinero"
        className={css({
          position: 'absolute',
          height: '350px',
          bottom: '0',
          left: '10%',
          borderRadius: 'md',
        })}
      />
      <img
        src="/static/home/fast.webp"
        alt="Gana dinero"
        className={css({
          height: '100%',
          borderRadius: 'md',
        })}
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 'xl',
        })}
      >
        <H2 textAlign="right">RÁPIDO, SENCILLO Y SIN ANUNCIOS</H2>
        <p
          className={css({
            fontSize: '2xl',
            fontFamily: 'nunitoSans',
            lineHeight: '1.3',
            color: 'text',
            width: '30ch',
            textAlign: 'right',
          })}
        >
          Deja atrás las interminables búsquedas y compra los mejores apuntes de
          forma segura con comentarios y previsualizaciones.
        </p>
        <ButtonLink href="/register" visual="action" size="lg">
          Comprar apuntes
        </ButtonLink>
      </div>
    </section>
  )
}
