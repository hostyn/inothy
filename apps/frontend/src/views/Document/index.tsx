import App from '@components/App'
import PageLayout from '@ui/PageLayout'
import { Separator } from '@ui/Separator'
import { css } from '@styled-system/css'
import { trpc } from '@services/trpc'
import { Button } from '@ui/Button'
import {
  MdPersonOutline,
  MdOutlineChat,
  MdOutlineApartment,
  MdOutlineBook,
  MdOutlineFitnessCenter,
  MdOutlineLaptopChromebook,
  MdOutlineWorkspacePremium,
  MdOutlineCalendarToday,
  MdOutlineDescription,
} from 'react-icons/md'

import { IoGlassesOutline } from 'react-icons/io5'
import { currencyFormatter } from '@util/normailize'
// import Image from 'next/image'
import Property from './components/Property'
import { Document, Page, pdfjs } from 'react-pdf'
// import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface DocumentProps {
  documentId: string
}

export default function DocumentView({
  documentId,
}: DocumentProps): JSX.Element {
  // const [numPages, setNumPages] = useState(0) // TODO: Uncomment if want to see all pages
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  // TODO: Uncomment if want to see all pages
  // const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
  //   setNumPages(numPages)
  // }

  const onCallToAction = (): void => {
    console.log('Botón accionado') // TODO: Cambiar toda la función una vez el botón tenga funcionalidad
    console.log(documentData)
  }

  return (
    <App>
      <PageLayout
        title={documentData?.title ?? ''}
        Icon={MdOutlineDescription}
        callToActionText="Comprar"
        onCallToAction={onCallToAction}
      >
        <div
          className={css({
            display: 'flex',
            width: 'inherit',
            gap: 'xl',
          })}
        >
          <div
            className={css({
              width: '2xl',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'md',
                px: 'sm',
              })}
            >
              <section
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 'md',
                })}
              >
                <p
                  className={css({
                    fontSize: '4xl',
                    fontWeight: '700',
                    color: 'primary.500',
                  })}
                >
                  {currencyFormatter.format(documentData?.price ?? 0)}
                </p>
                <Button
                  className={css({
                    alignSelf: 'center',
                  })}
                >
                  Comprar
                </Button>
              </section>

              <Property
                title="Descripción"
                icon={MdOutlineChat}
                content={documentData?.description ?? ''}
              />

              <Separator />

              <Property
                title="Usuario"
                icon={MdPersonOutline}
                content={documentData?.user.username ?? ''}
                link={`/user/${documentData?.user?.username ?? ''}`}
              />

              <Property
                title="Universidad"
                icon={MdOutlineApartment}
                content={documentData?.subject.university.name ?? ''}
              />

              <Property
                title="Asignatura"
                icon={MdOutlineBook}
                content={documentData?.subject.name ?? ''}
                link={`/subject/${documentData?.subject.id ?? ''}`}
              />

              <Property
                title="Tipo"
                icon={MdOutlineFitnessCenter}
                content={documentData?.documentType.name ?? ''}
              />

              <Property
                title="Producción"
                icon={MdOutlineLaptopChromebook}
                content={documentData?.byHand ?? true ? 'A mano' : 'Digital'}
              />

              {documentData?.calification != null && (
                <Property
                  title="Nota"
                  icon={MdOutlineWorkspacePremium}
                  content={documentData?.calification.toFixed(2)}
                />
              )}

              {documentData?.professor != null && (
                <Property
                  title="Profesor"
                  icon={IoGlassesOutline}
                  content={documentData?.professor}
                />
              )}

              {documentData?.year != null && (
                <Property
                  title="Año"
                  icon={MdOutlineCalendarToday}
                  content={documentData?.year?.toString()}
                />
              )}
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexGrow: '1',
              flexShrink: '0',
              flexBasis: '0',
              justifyContent: 'center',
              border: '1px solid token(colors.red.500)', // TODO: Remove once finished
            })}
          >
            {/* <Image
              alt={documentData?.title ?? 'Previsualización documento'}
              src={documentData?.previewUrl ?? ''}
            /> */}
            <Document
              file={documentData?.previewUrl}
              // onLoadSuccess={onDocumentLoadSuccess} //TODO: Uncomment if want to see all the pages
            >
              {/* TODO: Decide how many pages to show and if we need navigation */}
              <Page pageNumber={1} />
              {/* Uncomment if want to show all pages */}
              {/* {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className={css({ my: 'sm' })}
                />
              ))} */}
            </Document>
          </div>
        </div>
      </PageLayout>
    </App>
  )
}
