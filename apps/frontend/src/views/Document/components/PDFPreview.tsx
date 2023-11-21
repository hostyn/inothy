import { css } from '@styled-system/css'
import { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Document, Page, pdfjs } from 'react-pdf'
import LoadingPreview from './LoadingPreivew'

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`

interface PDFPreviewProps {
  previewPdfUrl: string
}

export default function PDFPreview({
  previewPdfUrl,
}: PDFPreviewProps): JSX.Element {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [inputPage, setInputPage] = useState<number>(1)
  const [documentWidth, setWidth] = useState<number>(608)

  const documentRef = useRef<HTMLDivElement>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages)
  }

  const setDocumentWidth = (): void => {
    const width =
      documentRef.current?.clientWidth != null
        ? documentRef.current?.clientWidth - 6
        : 0
    setWidth(width)
  }

  useEffect(() => {
    setDocumentWidth()
  }, [documentRef])

  useEffect(() => {
    window.addEventListener('resize', setDocumentWidth)

    return () => {
      window.removeEventListener('resize', setDocumentWidth)
    }
  }, [])

  return (
    <div
      className={css({
        height: '100%',
        width: '100%',
      })}
      ref={documentRef}
    >
      <Document
        file={previewPdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<LoadingPreview />}
        className={css({
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Page pageNumber={pageNumber} loading={<></>} width={documentWidth} />
        {numPages != null && (
          <div
            className={css({
              position: 'absolute',
              backgroundColor: 'token(colors.grey.100)',
              rounded: 'md',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'sm',
              gap: 'sm',
              fontSize: 'sm',
              bottom: '3rem',
              left: '50%',
              transform: 'translate(-50%, 0)',
            })}
          >
            <button
              disabled={pageNumber <= 1}
              onClick={() => {
                const newPageNumber = pageNumber > 0 ? pageNumber - 1 : 0
                setPageNumber(newPageNumber)
                setInputPage(newPageNumber)
              }}
              className={css({
                borderRadius: 'md',
                _focus: {
                  outline: '2px solid token(colors.primary.300)',
                },
              })}
            >
              <MdKeyboardArrowLeft
                size="24"
                className={css({ fill: 'gray.900' })}
              />
            </button>
            <input
              className={css({
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                rounded: 'md',
                width: '6xs',
                height: '7xs',
                backgroundColor: 'token(colors.grey.200)',
                transition: 'outline-with 150ms ease',

                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: '0',
                },

                _focus: {
                  outline: '2px solid token(colors.primary.300)',
                },
              })}
              type="number"
              value={inputPage}
              min={0}
              max={numPages}
              onChange={({ target: { valueAsNumber } }) => {
                setInputPage(valueAsNumber)
                if (Number.isNaN(valueAsNumber)) return

                valueAsNumber <= numPages &&
                  valueAsNumber > 0 &&
                  setPageNumber(valueAsNumber)
              }}
              onBlur={() => {
                setInputPage(pageNumber)
              }}
            />

            <p>/</p>
            <p>{numPages}</p>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => {
                const newPageNumber =
                  pageNumber < numPages ? pageNumber + 1 : numPages
                setPageNumber(newPageNumber)
                setInputPage(newPageNumber)
              }}
              className={css({
                borderRadius: 'md',
                _focus: {
                  outline: '2px solid token(colors.primary.300)',
                },
              })}
            >
              <MdKeyboardArrowRight
                size="24"
                className={css({ fill: 'gray.900' })}
              />
            </button>
          </div>
        )}
      </Document>
    </div>
  )
}
