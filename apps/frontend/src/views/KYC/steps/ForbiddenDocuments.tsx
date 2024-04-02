import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import DocumentNotVisible from '../icons/DocumentNotVisible'
import DataNotVisible from '../icons/DataNotVisible'
import DocumentCovered from '../icons/DocumentCovered'
import DocumentBlur from '../icons/DocumentBlur'
import DocumentBlackAndWhite from '../icons/DocumentBlackAndWhite'
import DocumentTwoInOnePicture from '../icons/DocumentTwoInOnePicture'
import { MdCancel } from 'react-icons/md'

export default function ForbiddenDocuments({
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
          Errores al subir el documento
        </h2>
        <div
          className={css({
            display: 'grid',
            gap: 'md',
            gridTemplateColumns: '1fr',

            sm: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },

            md: {
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
          })}
        >
          <Forbidden Icon={DocumentNotVisible} text="Documento no visible." />
          <Forbidden Icon={DataNotVisible} text="Datos no visibles." />
          <Forbidden
            Icon={DocumentCovered}
            text="Cubierto por cualquier cosa."
          />
          <Forbidden Icon={DocumentBlur} text="Imagen borrosa." />
          <Forbidden
            Icon={DocumentBlackAndWhite}
            text="Imagen en blanco y negro."
          />
          <Forbidden
            Icon={DocumentTwoInOnePicture}
            text="Ambas caras en la misma imagen."
          />
        </div>
      </div>
    </TabContent>
  )
}

const Forbidden = ({
  text,
  Icon,
}: {
  text: string
  Icon: () => JSX.Element
}): JSX.Element => {
  return (
    <div
      className={css({
        position: 'relative',
        border: '1px solid token(colors.grey.100)',
        borderRadius: 'md',
        p: 'md',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mr: '6px',
      })}
    >
      <Icon />
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
      <MdCancel
        size={24}
        className={css({
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          color: 'red.500',
          bg: 'white',
        })}
      />
    </div>
  )
}
