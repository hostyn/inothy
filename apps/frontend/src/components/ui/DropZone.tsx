import { toastError } from '@services/toaster'
import { css } from '@styled-system/css'
import { formatBytes } from '@util/normailize'
import { useEffect, useState } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdClose } from 'react-icons/md'

interface DropZoneProps {
  onFile: (file: File | null) => void
  initialFile?: File
  maxFileSize?: number
  minFileSize?: number
  accept?: string
}

export default function DropZone({
  onFile,
  initialFile,
  maxFileSize,
  minFileSize,
  accept,
}: DropZoneProps): JSX.Element {
  const [file, setFile] = useState<File | null>(initialFile ?? null)

  const preventDefault = (
    next?: React.DragEventHandler<HTMLLabelElement>
  ): React.DragEventHandler<HTMLLabelElement> => {
    return e => {
      e.preventDefault()
      e.stopPropagation()
      next?.(e)
    }
  }

  const handleDrop: React.DragEventHandler<HTMLLabelElement> = preventDefault(
    e => {
      const file = e.dataTransfer.files[0]
      if (maxFileSize != null && file.size > maxFileSize) {
        toastError(
          `El archivo debe pesar menos de ${formatBytes(maxFileSize)}.`
        )
        return
      }

      if (minFileSize != null && file.size < minFileSize) {
        toastError(`El archivo debe pesar más de ${formatBytes(minFileSize)}.`)
        return
      }

      setFile(file)
    }
  )

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0] ?? null

    if (file == null) {
      setFile(null)
      return
    }

    if (maxFileSize != null && file.size > maxFileSize) {
      toastError(`El archivo debe pesar menos de ${formatBytes(maxFileSize)}.`)
      return
    }

    if (minFileSize != null && file.size < minFileSize) {
      toastError(`El archivo debe pesar más de ${formatBytes(minFileSize)}.`)
      return
    }

    setFile(file)
  }

  const handleRemoveFile: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    setFile(null)
  }

  useEffect(() => {
    onFile(file)
  }, [file])

  return (
    <label
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minH: 'md',
        height: '20vh',
        maxH: 'xl',
        width: '100%',
        borderRadius: 'md',
        border: '2px solid token(colors.grey.100)',
        borderStyle: 'dashed',
        gap: 'md',
        position: 'relative',
        cursor: 'pointer',
      })}
      onDragEnter={preventDefault()}
      onDragLeave={preventDefault()}
      onDragOver={preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        key={file?.name ?? Math.random()}
        multiple={false}
        accept={accept}
        className={css({
          display: 'none',
        })}
        onChange={handleFileChange}
      />
      {file == null ? (
        <>
          <span>
            <BsFileEarmarkPlus
              size={32}
              className={css({
                fill: 'grey.500',
              })}
            />
          </span>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'xs',
              userSelect: 'none',
            })}
          >
            <span
              className={css({
                color: 'grey.500',
                fontSize: 'lg',
                fontWeight: '600',
                lineHeight: '100%',
              })}
            >
              Arrastra tu documento aquí
            </span>
            <span
              className={css({
                color: 'grey.500',
                fontSize: 'sm',
                lineHeight: '100%',
              })}
            >
              O haz click para seleccionarlo
            </span>
          </div>
        </>
      ) : (
        <div className={fileContainerStyles}>
          <span
            className={css({
              color: 'text',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            })}
          >
            {file.name}
          </span>
          <span
            title="Cambiar el documento"
            className={css({
              cursor: 'pointer',
              bg: 'grey.100',
              borderRadius: 'md',
              padding: 'xs',
              transition: 'background-color 100ms ease-in-out',

              _hover: {
                bg: 'grey.200',
              },
            })}
          >
            <LiaExchangeAltSolid
              size={24}
              className={css({
                fill: 'primary.500',
              })}
            />
          </span>
          <button
            title="Eliminar documento"
            type="button"
            onClick={handleRemoveFile}
            className={css({
              cursor: 'pointer',
              bg: 'red.100',
              borderRadius: 'md',
              padding: 'xs',
              transition: 'background-color 100ms ease-in-out',

              _hover: {
                bg: 'red.200',
              },
            })}
          >
            <MdClose
              size={24}
              className={css({
                fill: 'red.500',
              })}
            />
          </button>
        </div>
      )}
    </label>
  )
}

const fileContainerStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  alignItems: 'center',
  gap: 'sm',
  width: 'min(token(sizes.4xl), 90%)',
  padding: 'md',
  borderRadius: 'md',
  border: '1px solid token(colors.grey.100)',
})
