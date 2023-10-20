import App from '@components/App'
import PageLayout from '@ui/PageLayout'
import { hstack, stack } from '@styled-system/patterns'
import { Separator } from '@ui/Separator'
import { css } from '@styled-system/css'
import { trpc } from '@services/trpc'
import { useRouter } from 'next/router'
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

export default function DocumentView(): JSX.Element {
  const { query } = useRouter()

  const documentId = Array.isArray(query.documentId)
    ? query.documentId[0]
    : query.documentId

  const { data: documentData } = trpc.document.getDocument.useQuery({
    id: documentId!,
  })

  return (
    <App>
      <PageLayout title={documentData?.title!} Icon={MdOutlineDescription}>
        <div
          className={css({
            display: 'flex',
            width: 'inherit',
          })}
        >
          <div
            className={css({
              mr: 'xl',
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
                  {currencyFormatter.format(documentData?.price!)}
                </div>
                <Button
                  className={css({
                    alignSelf: 'center',
                    height: 'fit-content',
                    fontSize: 'md',
                    fontWeight: '700',
                  })}
                >
                  Comprar
                </Button>
              </div>

              <div className={hstack({ gap: 'sm' })}>
                <MdOutlineChat
                  size={'24px'}
                  className={css({
                    color: 'grey.500',
                    minWidth: '7xs',
                  })}
                />
                <div className={stack({ gap: 'xs' })}>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Descripción
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Usuario
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Universidad
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Asignatura
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Tipo
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Producción
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Nota
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Profesor
                  </p>
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
                  size={'24px'}
                  className={css({ color: 'grey.500', minWidth: '7xs' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Año
                  </p>
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
              border: '1px solid #000',
              display: 'flex',
              flexGrow: '1',
              flexShrink: '0',
              flexBasis: '0',

              // `url(${documentData?.filePath})`
              bgImage: 'url(/check.svg)',
              bgPosition: 'center',
              bgRepeat: 'no-repeat',
              backgroundSize: 'cover',
            })}
          >
            {/* <Image /> */}
          </div>
        </div>
      </PageLayout>
    </App>
  )
}
