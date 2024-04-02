import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { MdCheckCircle } from 'react-icons/md'

export default function AllowedDocuments({
  next,
  setData,
  ...props
}: StepProps): JSX.Element {
  return (
    <TabContent
      onSubmit={e => {
        e.preventDefault()
        next()
      }}
      {...props}
    >
      <div
        className={css({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'sm',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: '700',
            lineHeight: '100%',
            textAlign: 'center',
            color: 'text',
            fontFamily: 'nunitoSans',
          })}
        >
          Documento oficial
        </h1>
        <p
          className={css({
            fontSize: 'lg',
            maxWidth: '50ch',
            fontWeight: '400',
            lineHeight: '100%',
            textAlign: 'center',
            color: 'grey.500',
          })}
        >
          Sube una foto de tu documento de identidad oficial.
        </p>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'md',
          width: '100%',
        })}
      >
        <h2
          className={css({
            fontSize: 'lg',
            fontWeight: '700',
            lineHeight: '100%',
            color: 'text',
            fontFamily: 'nunitoSans',
          })}
        >
          Cómo subir el documento
        </h2>
        <div
          className={css({
            display: 'grid',
            gap: 'md',
            gridTemplateColumns: '1fr',

            md: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
          })}
        >
          <Allowed text="Consistente con la información proporcionada en los pasos anteriores." />
          <Allowed text="Una foto en color, no un escaneo." />
          <Allowed text="Ser mayor de 18 años." />
          <Allowed text="Válido y actualizado." />
          <Allowed text="Una foto para cada lado (una única foto para el pasaporte)." />
          <Allowed text="En uno de los formatos aceptados: PNG, PDF, JPG, JPEG." />
          <Allowed text="Pasaporte o documento nacional de identidad (excepto algunos países)." />
          <Allowed text="Con un tamaño de entre 32KB y 7MB." />
        </div>
      </div>
    </TabContent>
  )
}

const Allowed = ({ text }: { text: string }): JSX.Element => {
  return (
    <div
      className={css({
        position: 'relative',
        border: '1px solid token(colors.grey.100)',
        borderRadius: 'md',
        px: 'md',
        py: 'sm',
        mr: '6px',

        md: {
          py: 'md',
        },
      })}
    >
      <p
        className={css({
          color: 'grey.500',
          height: '4xs',
          display: 'flex',
          alignItems: 'center',
        })}
      >
        {text}
      </p>
      <MdCheckCircle
        size={24}
        className={css({
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          color: 'green.500',
          bg: 'white',
        })}
      />
    </div>
  )
}
