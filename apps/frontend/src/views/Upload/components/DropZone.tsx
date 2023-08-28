import { css } from '@styled-system/css'
import { useState } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs'

interface DropZoneProps {
  onFile: (file: File | null) => void
}

export default function DropZone({ onFile }: DropZoneProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null)

  const handleDrag: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    setFile(file)
    onFile(file)
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0] ?? null
    setFile(file)
    onFile(file)
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'xl',
        width: '4xl',
        borderRadius: 'md',
        border: '2px solid token(colors.grey.100)',
        borderStyle: 'dashed',
        gap: 'md',
        position: 'relative',
      })}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {file == null ? (
        <>
          <input
            type="file"
            id="dropzone-fileinput"
            multiple={false}
            className={css({
              display: 'none',
            })}
            onChange={handleFileChange}
          />
          <label htmlFor="dropzone-fileinput">
            <BsFileEarmarkPlus
              size={32}
              className={css({
                fill: 'grey.500',
              })}
            />
          </label>
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
            <label
              htmlFor="dropzone-fileinput"
              className={css({
                color: 'grey.500',
                fontSize: 'lg',
                fontWeight: '600',
                lineHeight: '100%',
              })}
            >
              Arrastra tu documento aquí
            </label>
            <label
              htmlFor="dropzone-fileinput"
              className={css({
                color: 'grey.500',
                fontSize: 'sm',
                lineHeight: '100%',
              })}
            >
              O haz click para seleccionarlo
            </label>
          </div>
        </>
      ) : (
        <h1>{file.name}</h1>
      )}
    </div>
  )
}
