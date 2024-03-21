/* eslint-disable @next/next/no-img-element */
import { css } from '@styled-system/css'
import { H2 } from '@ui/Title'
import { MdOutlineCheck } from 'react-icons/md'

export default function BestOption(): JSX.Element {
  return (
    <section
      className={css({
        position: 'relative',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',

        gap: '6xl',
        py: '8xl',

        height: 'fit-content',

        _before: {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: 0,
          bg: 'grey.700',
          height: '100%',
          width: '100vw',
        },
      })}
    >
      <H2 visual="white">LA MEJOR OPCIÓN PARA COMPRADORES Y VENDEDORES</H2>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'xl',
        })}
      >
        <Card
          title="Compradores"
          facts={[
            'Comentarios',
            'Previsualizaciones',
            'Academias y profesores',
          ]}
          image="/static/home/seller.webp"
          bg="primary.400"
        />
        <Card
          title="Vendedores"
          facts={['Precios libres', 'Comisiones bajas', 'Mayores ingresos']}
          image="/static/home/pig.webp"
          bg="primary.300"
        />
      </div>
    </section>
  )
}

interface CardProps {
  title: string
  facts: string[]
  image: string
  bg: string
}

const Card = ({ title, facts, image, bg }: CardProps): JSX.Element => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      bg,
      color: 'white',
      gap: 'lg',
      px: '5xl',
      py: 'xl',
    })}
  >
    <img
      src={image}
      alt={title}
      className={css({
        height: '200px',
      })}
    />
    <h3
      className={css({
        fontSize: '2xl',
        fontWeight: 'bold',
        fontFamily: 'nunitoSans',
        textAlign: 'center',
      })}
    >
      {title}
    </h3>
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 'md',
      })}
    >
      {facts.map(fact => (
        <p
          key={fact}
          className={css({
            textAlign: 'center',
            fontSize: 'xl',
            display: 'flex',
            alignItems: 'center',
            gap: 'md',
          })}
        >
          <MdOutlineCheck />
          {fact}
        </p>
      ))}
    </div>
  </div>
)
