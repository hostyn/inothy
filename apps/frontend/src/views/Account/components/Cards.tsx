import AlertDialog from '@components/AlertDialog'
import SectionLayout from '../layouts/SectionLayout'
import { trpc } from '@services/trpc'
import { toastError, toastSuccess } from '@services/toaster'
import { css } from '@styled-system/css'
import { MasterCardIcon, UnknownCardIcon, VisaIcon } from '@components/icons'
import { MdDeleteOutline } from 'react-icons/md'
import { CiCreditCardOff } from 'react-icons/ci'

export default function Cards(): JSX.Element {
  const trpcContext = trpc.useContext()
  const { data: userCards } = trpc.auth.getUserCards.useQuery()
  const removeCard = trpc.auth.removeUserCard.useMutation({
    onSuccess: async () => {
      await trpcContext.auth.getUserCards.invalidate()
      toastSuccess('Tarjeta eliminada')
    },
    onError: () => {
      toastError('No se pudo eliminar la tarjeta')
    },
  })

  return (
    <SectionLayout
      title="Métodos de pago"
      description="Estas son tus tarjetas guardadas. Puedes usarlas para comprar documentos."
      bottomText="Puedes eliminar tus tarjetas guardadas en cualquier momento."
      dialogDescription=""
      dialogOnConfirm={() => {}}
      dialogTitle=""
    >
      {(userCards?.length ?? 0) > 0 ? (
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: 'sm',
          })}
        >
          {userCards?.map(userCard => (
            <article
              key={userCard.id}
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                borderRadius: 'md',
                bg: 'primary.100',
                transition:
                  'outline-width 50ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
                border: '2px solid transparent',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  gap: 'sm',
                  alignItems: 'center',
                  border: 'none',
                  background: 'none',
                  padding: 'sm',
                  color: 'primary.500',
                  fontSize: 'sm',
                  fontWeight: '600',
                  transition: 'color 150ms ease-in-out',
                  borderRadius: 'md',

                  _hover: {
                    color: 'primary.600',
                  },

                  _focusVisible: {
                    outline: '3px solid token(colors.primary.200)',
                  },
                })}
              >
                {userCard.cardProvider === 'VISA' ? (
                  <VisaIcon
                    className={css({
                      minWidth: 'min-content',
                    })}
                  />
                ) : userCard.cardProvider === 'MASTERCARD' ? (
                  <MasterCardIcon
                    className={css({
                      minWidth: 'min-content',
                    })}
                  />
                ) : (
                  <UnknownCardIcon
                    className={css({
                      minWidth: 'min-content',
                    })}
                  />
                )}
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'xs',
                    width: '100%',
                  })}
                >
                  <span
                    className={css({
                      color: 'primary.500',
                      fontWeight: '600',
                      fontSize: 'sm',
                      lineHeight: '1',
                    })}
                  >
                    {userCard.alias}
                  </span>
                  <span
                    className={css({
                      color: 'grey.400',
                      lineHeight: '1',
                      fontSize: 'xs',
                    })}
                  >
                    {[
                      userCard.expirationDate.slice(0, 2),
                      userCard.expirationDate.slice(2),
                    ].join('/')}
                  </span>
                </div>
              </div>

              <AlertDialog
                dialogTitle="Eliminar tarjeta"
                dialogDescription={`¿Estás seguro que deseas eliminar la tarjeta ${userCard.alias}?`}
                dialogOnConfirm={() => {
                  removeCard.mutate({ id: userCard.id })
                }}
              >
                <button
                  className={css({
                    p: 'sm',
                    color: 'grey.500',
                    borderRadius: '9999px',
                    transition:
                      'background-color 150ms ease-in-out, color 150ms ease-in-out',

                    _hover: {
                      bg: 'red.200',
                      color: 'red.800',
                    },

                    _focusVisible: {
                      outline: 'none',
                      bg: 'red.200',
                      color: 'red.800',
                    },
                  })}
                >
                  <MdDeleteOutline />
                </button>
              </AlertDialog>
            </article>
          ))}
        </div>
      ) : (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text',
          })}
        >
          <CiCreditCardOff size={24} />
          <h3
            className={css({
              fontWeight: '600',
            })}
          >
            No tienes tarjetas guardadas
          </h3>
        </div>
      )}
    </SectionLayout>
  )
}
