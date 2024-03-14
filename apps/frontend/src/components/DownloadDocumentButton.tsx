import useDownloadDocument from '@hooks/useDownloadDocument'
import { Button } from '@ui/Button'
import { MdDownloadDone, MdOutlineFileDownload } from 'react-icons/md'
import CircleProgress from './CircleProgress'
import { useEffect } from 'react'
import { css } from '@styled-system/css'

interface DwnloadDocumentButtonProps {
  documentId: string
  showText?: boolean
}

export default function DownloadDocumentButton({
  documentId,
  showText = false,
}: DwnloadDocumentButtonProps): JSX.Element {
  const { download, loading, progress, downloaded, reset } =
    useDownloadDocument({
      documentId,
    })

  useEffect(() => {
    if (!downloaded) return
    const timeout = setTimeout(() => {
      reset()
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [downloaded])

  return (
    <Button
      onClick={download}
      disabled={loading}
      title={
        loading
          ? 'Descargando documento'
          : downloaded
          ? 'Documento descargado'
          : 'Descargar documento'
      }
      className={css({
        display: 'flex',
        gap: 'sm',
        justifyContent: 'center',
        alignItems: 'center',
        width: showText ? '13ch' : 'fit-content',
        minW: showText ? '13ch' : 'fit-content',
      })}
    >
      {loading ? (
        <CircleProgress progress={progress} />
      ) : downloaded ? (
        <MdDownloadDone size="1.5em" />
      ) : (
        <>
          {showText && 'Descargar'}
          <MdOutlineFileDownload size="1.5em" />
        </>
      )}
    </Button>
  )
}
