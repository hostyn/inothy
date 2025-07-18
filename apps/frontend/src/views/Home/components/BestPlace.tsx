/* eslint-disable @next/next/no-img-element */
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { ButtonLink } from '@ui/Button'
import { H2 } from '../ui/Title'
import Image from 'next/image'
import { P } from '../ui/P'

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          gap: '2xl',

          lg: {
            display: 'grid',
            gridTemplateColumns: '1fr auto',
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
          <H2 textAlign="left">EL LUGAR IDEAL PARA LOS ESTUDIANTES</H2>
          <P textAlign="left">
            Inothy es tu sitio perfecto si quieres ganar dinero vendiendo tus
            apuntes y aprobar comprando el mejor material.
          </P>
          <ButtonLink href="/register" visual="action" size="lg">
            Registrarse
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
              height: '48px',
              width: '48px',

              md: {
                height: 'auto',
                width: 'auto',
              },
            })}
          />
        ))}
      </div>
    </section>
  )
}
