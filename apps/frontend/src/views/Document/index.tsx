import App from '@components/App'
import PageLayout from '@ui/PageLayout'
import { hstack, stack } from '@styled-system/patterns'
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
import Image from 'next/image'
import Property from './components/Property'

interface DocumentProps {
  documentId: string
}

export default function DocumentView({
  documentId,
}: DocumentProps): JSX.Element {
  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId,
  })

  return (
    <App>
      <PageLayout
        title={documentData?.title ?? ''}
        Icon={MdOutlineDescription}
        button
        buttonTitle="Comprar"
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
              className={stack({
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
                <div
                  className={css({
                    fontSize: '4xl',
                    fontWeight: '700',
                    color: 'primary.500',
                  })}
                >
                  {currencyFormatter.format(documentData?.price ?? 0)}
                </div>
                <Button
                  className={css({
                    alignSelf: 'center',
                  })}
                >
                  Comprar
                </Button>
              </section>
              <section>
                <Property
                  title="Descripción"
                  icon={MdOutlineChat}
                  content={documentData?.description ?? ''}
                />
              </section>

              <Separator />
              <section>
                <Property
                  title="Usuario"
                  icon={MdPersonOutline}
                  content={documentData?.userId ?? ''}
                />
              </section>
              <section>
                <Property
                  title="Universidad"
                  icon={MdOutlineApartment}
                  content={documentData?.subject.universityId ?? ''}
                />
              </section>

              <section>
                <Property
                  title="Asignatura"
                  icon={MdOutlineBook}
                  content={documentData?.subjectId ?? ''}
                />
              </section>
              <section>
                <Property
                  title="Tipo"
                  icon={MdOutlineFitnessCenter}
                  content={documentData?.documentTypeId ?? ''}
                />
              </section>
              <section>
                <Property
                  title="Producción"
                  icon={MdOutlineLaptopChromebook}
                  content={documentData?.byHand ? 'A mano' : 'Digital' ?? false}
                />
              </section>
              <section>
                {documentData?.calification != null && (
                  <Property
                    title="Nota"
                    icon={MdOutlineWorkspacePremium}
                    content={documentData?.calification ?? 0}
                  />
                )}
              </section>
              <section>
                {documentData?.calification != null && (
                  <Property
                    title="Profesor"
                    icon={IoGlassesOutline}
                    content={documentData?.professor ?? ''}
                  />
                )}
              </section>
              <section>
                {documentData?.calification != null && (
                  <Property
                    title="Año"
                    icon={MdOutlineCalendarToday}
                    content={documentData?.year ?? 0}
                  />
                )}
              </section>
            </div>
          </div>
          <div
            className={css({
              border: '1px solid token(colors.grey.700)', //TODO: Esto es para ver hasta donde llega
              display: 'flex',
              flexGrow: '1',
              flexShrink: '0',
              flexBasis: '0',
            })}
          >
            <Image
              alt={documentData?.title ?? 'Previsualización documento'}
              src={documentData?.previewUrl ?? ''}
            />
          </div>
        </div>
      </PageLayout>
    </App>
  )
}
