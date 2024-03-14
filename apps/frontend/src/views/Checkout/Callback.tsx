import App from '@components/App'
import Spinner from '@components/Spinner'
import useAuth from '@hooks/useAuth'
import { trpc } from '@services/trpc'
import { css } from '@styled-system/css'
import { PageSpacing } from '@ui/PageSpacing'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  transactionId: string
}

export default function Callback({ transactionId }: Props): JSX.Element {
  const { user } = useAuth()
  const { push } = useRouter()
  const updateReceipt = trpc.checkout.updateReceipt.useMutation({
    onSuccess: async data => {
      if (data.status === 'SUCCEEDED' || data.status === 'FAILED') {
        await push('/receipt/' + transactionId)
        return
      }

      if (data.status === 'CREATED') {
        setTimeout(() => {
          updateReceipt.mutate({ transactionId })
        }, 10000)
      }
    },
  })

  useEffect(() => {
    if (user == null || !updateReceipt.isIdle) {
      return
    }

    updateReceipt.mutate({ transactionId })
  }, [user])

  return (
    <App>
      <PageSpacing
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 'md',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <h1
            className={css({
              fontSize: 'xl',
              color: 'text',
              fontFamily: 'nunitoSans',
              fontWeight: '600',
            })}
          >
            Estamos procesando tu pago
          </h1>
          <p
            className={css({
              fontSize: 'md',
              color: 'text',
              textAlign: 'center',
              maxW: '60ch',
              lineHeight: '1.3',
            })}
          >
            Esta página se actualizará automáticamente cuando tu pago se haya
            procesado.
          </p>
        </div>
        <Spinner
          className={css({
            fontSize: 'xl',
            stroke: 'text',
          })}
        />
      </PageSpacing>
    </App>
  )
}
