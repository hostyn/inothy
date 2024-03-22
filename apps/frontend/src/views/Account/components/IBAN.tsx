import { trpc } from '@services/trpc'
import SectionLayout from '../layouts/SectionLayout'
import Input from '@ui/Input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@styled-system/css'
import Spinner from '@components/Spinner'
import { useState } from 'react'
import { toastError, toastSuccess } from '@services/toaster'

const ibanSchema = z.object({
  iban: z
    .string()
    .regex(/^[a-zA-Z]{2}\d{2}\s*(\w{4}\s*){2,7}\w{1,4}\s*$/, 'IBAN inválido.'),
})

type FormValues = z.infer<typeof ibanSchema>

export default function IBAN(): JSX.Element {
  const [open, setOpen] = useState(false)

  const trpcContext = trpc.useContext()
  const { data: bankAccount } = trpc.auth.getBankAccount.useQuery()
  const updateBankAccount = trpc.auth.updateBankAccount.useMutation({
    onSuccess: async () => {
      await trpcContext.auth.getBankAccount.invalidate()
      toastSuccess('IBAN actualizado con éxito.')
    },

    onError: () => {
      toastError(
        'El IBAN no es válido. Por favor, asegúrate de que el IBAN es correcto.'
      )
    },
  })

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',

    resolver: zodResolver(ibanSchema),
    values: {
      iban: bankAccount?.iban ?? '',
    },
  })

  const handleFormSubmit = handleSubmit(() => {
    setOpen(true)
  })

  const onSubmit = async (): Promise<void> => {
    const bankAccount = getValues('iban')
    updateBankAccount.mutate({
      iban: bankAccount,
    })
  }

  return (
    <SectionLayout
      title="Cuenta bancaria"
      description="Aquí puedes configurar la cuenta bancaria a la que quieres retirar tu saldo."
      bottomText="La cuenta bancaria debe estar a tu nombre."
      buttonContent={
        updateBankAccount.isLoading ? (
          <Spinner className={css({ my: 'xs', mx: 'auto' })} />
        ) : bankAccount != null ? (
          'Cambiar IBAN'
        ) : (
          'Añadir IBAN'
        )
      }
      disabled={
        watch('iban') === bankAccount?.iban ||
        watch('iban').length === 0 ||
        updateBankAccount.isLoading
      }
      dialogTitle="¿Cambiar IBAN?"
      dialogDescription={`¿Quieres cambiar tu cuenta banacaria para los retiros a ${watch(
        'iban'
      )}?`}
      dialogOnConfirm={onSubmit}
      onSubmit={handleFormSubmit}
      open={open}
      onOpenChange={state => {
        if (!state) setOpen(false)
      }}
    >
      <Input
        nativePlaceholder="ESXX XXXX XXXX XXXX XXXX XXXX"
        keepErrorSpace
        {...register('iban', {
          onChange: () => {
            clearErrors('iban')
          },
        })}
        error={errors.iban}
      />
    </SectionLayout>
  )
}
