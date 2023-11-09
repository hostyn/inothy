import App from '@components/App'
import PageLayout from '@ui/PageLayout'
import { Separator } from '@ui/Separator'
import { css } from '@styled-system/css'
import { trpc } from '@services/trpc'
import { Button } from '@ui/Button'
import {
  MdPersonOutline,
  MdOutlineChat,
  MdOutlineBook,
  MdOutlineFitnessCenter,
  MdOutlineLaptopChromebook,
  MdOutlineWorkspacePremium,
  MdOutlineCalendarToday,
} from 'react-icons/md'
import { IoGlassesOutline } from 'react-icons/io5'
import { currencyFormatter } from '@util/normailize'
import Property from './components/Property'
import PDFPreview from './components/PDFPreview'
import { BsFileEarmarkText } from 'react-icons/bs'
import { DOCUMENT_TYPES } from '@config/constants'
import { LiaUniversitySolid } from 'react-icons/lia'
import NoPreview from './components/NoPreview'

interface DocumentProps {
  documentId: string
}

export default function DocumentView({
  documentId,
}: DocumentProps): JSX.Element {
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  const onCallToAction = (): void => {
    console.log('Botón accionado') // TODO: Cambiar toda la función una vez el botón tenga funcionalidad
    console.log(documentData)
  }

  return (
    <App>
      <PageLayout
        title={documentData?.title ?? ''}
        Icon={BsFileEarmarkText}
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
              minWidth: '2xl',
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
                icon={LiaUniversitySolid}
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
                content={
                  documentData?.documentType.name != null
                    ? DOCUMENT_TYPES[documentData?.documentType.name] ?? 'Otro'
                    : ''
                }
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
              position: 'relative',
              aspectRatio: '1/1.414',
              width: '100%',
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
              outline: '1px solid token(colors.grey.100)',
              borderRadius: 'md',
            })}
          >
            {documentData?.previewUrl != null ? (
              <PDFPreview previewUrl={documentData?.previewUrl} />
            ) : (
              <NoPreview mimeType={documentData?.contentType ?? ''} />
            )}
          </div>
        </div>
      </PageLayout>
    </App>
  )
}
