import { trpc } from '@services/trpc'
import type { RouterInputs, RouterOutputs } from 'backend'

type MutateAsync = ({
  accept,
  ...params
}: Omit<RouterInputs['checkout']['checkoutDocument'], 'browserInfo'> & {
  accept: string
}) => Promise<RouterOutputs['checkout']['checkoutDocument']>

export const useCheckoutDocument = (): MutateAsync => {
  const mutation = trpc.checkout.checkoutDocument.useMutation()

  const mutate: MutateAsync = async ({ accept, ...params }) =>
    await mutation.mutateAsync({
      ...params,
      browserInfo: {
        acceptHeader: accept,
        colorDepth: window.screen.colorDepth,
        language: navigator.language,
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        timeZoneOffset: new Date().getTimezoneOffset().toString(),
        userAgent: navigator.userAgent,
        javaEnabled: navigator.javaEnabled(),
      },
    })

  return mutate
}
