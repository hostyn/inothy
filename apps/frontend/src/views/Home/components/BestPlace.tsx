/* eslint-disable @next/next/no-img-element */
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '@ui/Title'
import Image from 'next/image'

export default function BestPlace(): JSX.Element {
  const { data: universities } =
    trpc.universities.getHomeUniversities.useQuery()

  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        gap: '5xl',
      })}
    >
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          gap: '2xl',
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
          <H2 textAlign="left">EL LUGAR IDEAL PARA LOS ESTUDIANTES</H2>
          <p
            className={css({
              fontSize: '2xl',
              fontFamily: 'nunitoSans',
              lineHeight: '1.3',
              color: 'text',
              width: '40ch',
            })}
          >
            Inothy es tu sitio perfecto si quieres ganar dinero vendiendo tus
            apuntes y aprobar comprando el mejor material.
          </p>
          <ButtonLink href="/register" visual="action" size="lg">
            Empezar
          </ButtonLink>
        </div>

        <img
          src="/static/home/best-place.webp"
          alt="El lugar ideal para los estudiantes"
          className={css({
            width: '500px',
            borderRadius: 'md',
          })}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 'md',
          borderBlock: '2px solid token(colors.grey.100)',
        })}
      >
        {universities?.map(university => (
          <Image
            key={university.id}
            src={university.logoUrl}
            width={96}
            height={96}
            alt={university.name}
            title={university.name}
            className={css({
              borderRadius: 'md',
            })}
          />
        ))}
      </div>
    </section>
  )
}
