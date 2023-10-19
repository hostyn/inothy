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

export default function DocumentView({}: {}): JSX.Element {
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
              pr: '32px',
              width: '400px',
            })}
          >
            <div
              className={stack({
                gap: '16px',
                px: '8px',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: '16px',
                })}
              >
                <div
                  className={css({
                    fontSize: '48px',
                    fontWeight: '700',
                    color: 'primary.500',
                  })}
                >
                  {documentData?.price.toString().replace('.', ',')} €
                </div>
                <Button
                  className={css({
                    alignSelf: 'center',
                    height: 'fit-content',
                    fontSize: '16px',
                    fontWeight: '700',
                  })}
                >
                  Comprar
                </Button>
              </div>

              <div className={hstack({ gap: '8px' })}>
                <MdOutlineChat
                  size={'24px'}
                  className={css({
                    color: 'grey.500',
                    minW: '24px',
                  })}
                />
                <div className={stack({ gap: '4px' })}>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Descripción
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
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
              <div className={hstack({ gap: '8px' })}>
                <MdPersonOutline
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Usuario
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.userId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineApartment
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Universidad
                  </p>
                  {/* TODO: no encuentro la universidad en el modelo de prisma */}
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.title}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineBook
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Asignatura
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.subjectId}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineFitnessCenter
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Tipo
                  </p>
                  {/* TODO: A mano? De donde puedo sacar estos datos? */}
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.title}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineLaptopChromebook
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Producción
                  </p>
                  {/* TODO: A mano? De donde puedo sacar estos datos? */}
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.byHand ? 'A mano' : 'Digital'}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineWorkspacePremium
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Nota
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.rating}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <IoGlassesOutline
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Profesor
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
                      fontWeight: '700',
                      color: 'grey.500',
                    })}
                  >
                    {documentData?.professor}
                  </div>
                </div>
              </div>
              <div className={hstack({ gap: '8px' })}>
                <MdOutlineCalendarToday
                  size={'24px'}
                  className={css({ color: 'grey.500', minW: '24px' })}
                />
                <div>
                  <p
                    className={css({
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'grey.400',
                    })}
                  >
                    Año
                  </p>
                  <div
                    className={css({
                      fontSize: '16px',
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
          ></div>
        </div>
      </PageLayout>
    </App>
  )
}
