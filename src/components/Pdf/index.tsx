import { useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { colors } from '@config/theme'
import Loading from '@components/Loading'
import { Flex, Text } from '@ui'

const StyledLoading = styled(Loading)<{ height: string }>`
  height: ${props => `${props.height}px`};
`

const Button = styled.button`
  border: none;
  background: transparent;
  font-family: HelveticaRounded;
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.primary};
  cursor: pointer;

  :disabled {
    color: ${colors.hover};
    cursor: default;
  }
`

interface PDFProps {
  file: string
  className?: string
  loading: JSX.Element
}

export default function Pdf({
  file,
  className,
  loading,
}: PDFProps): JSX.Element {
  const [page, setPage] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const documentRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(183)
  const [isLoading, setIsLoading] = useState(true)

  const handleDocumentLoad = (pdf: any): void => {
    setIsLoading(false)
    setNumPages(pdf.numPages)
  }

  const handlePageLoad = (page: any): void => {
    setHeight(page.height)
  }

  const setDocumentWidth = (): number => {
    const width =
      documentRef.current?.clientWidth != null
        ? documentRef.current?.clientWidth - 6
        : 0
    setWidth(width)
    return width
  }

  useEffect(() => {
    const width = setDocumentWidth()
    setHeight((width * 25) / 19)
  }, [documentRef])

  useEffect(() => {
    window.addEventListener('resize', setDocumentWidth)

    return () => {
      window.removeEventListener('resize', setDocumentWidth)
    }
  }, [])

  return (
    <div ref={documentRef} className={className}>
      <div
        style={{ border: isLoading ? 'none' : `3px solid ${colors.primary}` }}
      >
        <Document
          onLoadSuccess={handleDocumentLoad}
          file={file}
          loading={loading}
        >
          <Page
            onLoadSuccess={handlePageLoad}
            pageNumber={page}
            renderAnnotationLayer={true}
            renderTextLayer={false}
            width={width}
            loading={<StyledLoading height={height.toString()} />}
          />
        </Document>
      </div>
      {!isLoading && (
        <Flex flexDirection="row" justifyContent="center" margin="1rem 0 0 0">
          <Button
            disabled={page <= 1}
            onClick={() => {
              setPage(page => page - 1)
            }}
          >
            {'<'}
          </Button>
          <Text
            fontSize="2rem"
            fontFamily="HelveticaRounded"
            userSelect="none"
            minWidth="8rem"
            textAlign="center"
          >
            {page} / {numPages}
          </Text>
          <Button
            disabled={numPages == null || page >= numPages}
            onClick={() => {
              setPage(page => page + 1)
            }}
          >
            {'>'}
          </Button>
        </Flex>
      )}
    </div>
  )
}
