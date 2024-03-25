/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { H2 } from '../ui/Title'

export default function YourBuddy(): JSX.Element {
  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        gap: '6xl',
      })}
    >
      <H2
        className={css({
          textAlign: 'left',
          lg: {
            textAlign: 'center',
          },
        })}
      >
        TU MEJOR COMPAÑERO EN LA CARRERA
      </H2>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'xl',

          lg: {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        })}
      >
        <Card
          title="Apuntes"
          description="Obtén el mejor material universitario y prepárate para aprobar."
          image="/static/home/medal.webp"
          bg="primary.700"
        />
        <Card
          title="Dinero"
          description="Vende tu material universitario  y genera ingresos de verdad con tu conocimiento."
          image="/static/home/coin.webp"
          bg="grey.600"
        />
        <Card
          title="Profesionales"
          description="Academias universitarias y profesores particulares eligen Inothy para vender su material."
          image="/static/home/suitcase.webp"
          bg="primary.400"
        />
      </div>
    </section>
  )
}

interface CardProps {
  title: string
  description: string
  image: string
  bg: string
}

const Card = ({ title, description, image, bg }: CardProps): JSX.Element => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      bg,
      color: 'white',
      px: 'xl',
      py: 'xl',
      gap: 'md',

      md: {
        flexDir: 'row',
        gap: '0',
      },

      lg: {
        flexDir: 'column',
      },
    })}
  >
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',

        lg: {
          gap: 'md',
          alignItems: 'center',
        },
      })}
    >
      <h3
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          fontFamily: 'nunitoSans',
        })}
      >
        {title}
      </h3>
      <p
        className={css({
          fontSize: 'xl',

          lg: {
            textAlign: 'center',
          },
        })}
      >
        {description}
      </p>
    </div>
    <img
      src={image}
      alt={title}
      className={css({
        height: '100px',

        lg: {
          height: 'auto',
        },
      })}
    />
  </div>
)
