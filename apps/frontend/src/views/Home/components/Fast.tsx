/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '../ui/Title'
import { P } from '../ui/P'

export default function Fast(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '4xl',

        lg: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
        },
      })}
    >
      <div
        className={css({
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'right',

          lg: {
            justifyContent: 'left',
          },
        })}
      >
        <img
          src="/static/home/fast-mockup.webp"
          alt="Gana dinero"
          className={css({
            position: 'absolute',
            borderRadius: 'md',
            width: '100%',
            bottom: '0',
            left: '0',

            md: {
              width: '80%',
            },

            lg: {
              width: '100%',
              bottom: '0',
              top: 'unset',
              right: '0',
            },
          })}
        />
        <img
          src="/static/home/fast.webp"
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
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'xl',

          lg: {
            alignItems: 'flex-end',
          },
        })}
      >
        <H2
          textAlign="left"
          className={css({
            lg: {
              textAlign: 'right',
            },
          })}
        >
          RÁPIDO, SENCILLO Y SIN ANUNCIOS
        </H2>
        <P
          textAlign="left"
          className={css({
            lg: {
              textAlign: 'right',
            },
          })}
        >
          Deja atrás las interminables búsquedas y compra los mejores apuntes de
          forma segura con comentarios y previsualizaciones.
        </P>
        <ButtonLink href="/register" visual="action" size="lg">
          Comprar apuntes
        </ButtonLink>
      </div>
    </section>
  )
}
