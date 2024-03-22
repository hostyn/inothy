/* eslint-disable @next/next/no-img-element */
import { VerifiedBadge } from '@components/VerfifiedBadge'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '@ui/Title'

export default function Experts(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        h: '700px',
        gap: '6xl',
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
        <p
          className={css({
            fontSize: '2xl',
            fontFamily: 'nunitoSans',
            lineHeight: '1.3',
            color: 'text',
            width: '40ch',
          })}
        >
          Consigue los mejores apuntes de la mano de profesionales.
        </p>
        <ButtonLink href="/register" visual="action" size="lg">
          Comprar apuntes
        </ButtonLink>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            width: '100%',
            gap: '5xl',
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
                  fontSize: '4xl',
                  fontFamily: 'nunitoSans',
                  fontWeight: 'bold',
                  letterSpacing: '-0.015em',
                  color: 'text',
                })}
              >
                Academias
              </h3>
              <VerifiedBadge type="academy" size="lg" />
            </div>
            <p
              className={css({
                fontSize: '2xl',
                fontFamily: 'nunitoSans',
                color: 'grey.500',
                letterSpacing: '-0.015em',
                lineHeight: '1.2',
              })}
            >
              Centros académicos verificados, expertos en la educación
              universitaria.
            </p>
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
                  fontSize: '4xl',
                  fontFamily: 'nunitoSans',
                  fontWeight: 'bold',
                  letterSpacing: '-0.015em',
                  color: 'text',
                })}
              >
                Profesores
              </h3>
              <VerifiedBadge type="professor" size="lg" />
            </div>
            <p
              className={css({
                fontSize: '2xl',
                fontFamily: 'nunitoSans',
                color: 'grey.500',
                letterSpacing: '-0.015em',
                lineHeight: '1.2',
              })}
            >
              Profesores particulares especializados en la carrera y asignatura
              que necesites.
            </p>
          </div>
        </div>
      </div>

      <img
        src="/static/home/experts.webp"
        alt="Gana dinero"
        className={css({
          height: '100%',
          borderRadius: 'md',
        })}
      />
    </section>
  )
}
