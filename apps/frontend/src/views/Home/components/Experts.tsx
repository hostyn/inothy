/* eslint-disable @next/next/no-img-element */
import { VerifiedBadge } from '@components/VerfifiedBadge'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '../ui/Title'
import { P } from '../ui/P'

export default function Experts(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        gap: '6xl',

        lg: {
          flexDir: 'row',
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'xl',
          maxW: '100%',
        })}
      >
        <H2 textAlign="left">APUNTES HECHOS POR EXPERTOS</H2>
        <P textAlign="left">
          Consigue los mejores apuntes de la mano de profesionales.
        </P>
        <ButtonLink href="/register" visual="action" size="lg">
          Comprar apuntes
        </ButtonLink>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            width: '100%',
            gap: 'lg',

            md: {
              gap: '2xl',
              gridTemplateColumns: 'repeat(2, 1fr)',
            },

            lg: {
              gap: '5xl',
            },
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'md',
              })}
            >
              <h3
                className={css({
                  fontSize: '2xl',
                  fontFamily: 'nunitoSans',
                  fontWeight: 'bold',
                  letterSpacing: '-0.015em',
                  color: 'text',

                  md: {
                    fontSize: '4xl',
                  },
                })}
              >
                Academias
              </h3>
              <VerifiedBadge type="academy" size="lg" />
            </div>
            <P textAlign="left">
              Centros académicos verificados, expertos en la educación
              universitaria.
            </P>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'sm',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'md',
              })}
            >
              <h3
                className={css({
                  fontSize: '2xl',
                  fontFamily: 'nunitoSans',
                  fontWeight: 'bold',
                  letterSpacing: '-0.015em',
                  color: 'text',

                  md: {
                    fontSize: '4xl',
                  },
                })}
              >
                Profesores
              </h3>
              <VerifiedBadge type="professor" size="lg" />
            </div>
            <P textAlign="left">
              Profesores particulares especializados en la carrera y asignatura
              que necesites.
            </P>
          </div>
        </div>
      </div>

      <img
        src="/static/home/experts.webp"
        alt="Gana dinero"
        className={css({
          height: '250px',
          borderRadius: 'md',

          md: {
            height: '400px',
          },

          lg: {
            height: '100%',
          },
        })}
      />
    </section>
  )
}
