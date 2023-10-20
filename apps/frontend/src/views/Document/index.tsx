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
              width: '2xl', //TODO: Este está aproximado a 24 rem siendo 25 en figma
            })}
          >
            <div
              className={stack({
                gap: 'md',
                px: 'sm',
              })}
            >
              <div
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
              </div>

              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineChat
                  size={24}
                  className={css({
                    color: 'grey.500',
                    minWidth: '7xs',
                  })}
                />
                <div className={stack({ gap: 'xs' })}>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Descripción
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '600',
                      color: 'grey.500',
                    })}
                  >
                    {/* {documentData?.description */}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Praesentium accusantium nam voluptas quibusdam iusto autem
                    nobis facere quisquam quod sed corrupti, amet quos quasi,
                    maxime eveniet nulla omnis minus alias cum esse nihil unde.
                    Perspiciatis perferendis sit nobis ad autem. Voluptas fuga
                    ratione ipsam excepturi corporis ea quis sit deleniti!
                  </div>
                </div>
              </div>

              <Separator />
              <div className={hstack({ gap: 'sm' })}>
                <MdPersonOutline
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Usuario
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.userId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineApartment
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Universidad
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.subject.universityId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineBook
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Asignatura
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.subjectId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineFitnessCenter
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Tipo
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.documentTypeId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineLaptopChromebook
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Producción
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {/* TODO: Buscar las opciones exactas */}
                    {documentData?.byHand ? 'A mano' : 'Digital'}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineWorkspacePremium
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Nota
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.rating}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <IoGlassesOutline
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Profesor
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.professor}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineCalendarToday
                  size={24}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Año
                  </span>
                  <div
                    className={css({
                      fontSize: 'md',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.year}
                  </div>
                </div>
              </div>
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
