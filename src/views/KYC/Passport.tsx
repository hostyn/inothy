import styled from 'styled-components'
import blobToBase64 from '@util/blobToB64'
import { Fileinput, Flex, Img } from '@ui'
import FormBody from '@components/FormBody'
import { useForm } from 'react-hook-form'
import { type KYCBaseProps } from '.'
import { completeKYC } from '@util/api'

const acceptedMimes = ['application/pdf', 'image/jpeg', 'image/png']

const StyledImg = styled(Img)`
  height: calc(16rem * 75 / 122);
  width: 16rem;
  @media (max-width: 900px) {
    height: calc(13rem * 75 / 122);
    width: 13rem;
  }

  @media (max-width: 768px) {
    height: calc(13rem * 75 / 122);
    width: 13rem;
  }
`

interface FormValues {
  passport: FileList
}

export default function Passport({
  setState,
  userData,
}: Omit<KYCBaseProps, 'setUserData'>): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  })

  const validateFile = (files: FileList): string | undefined => {
    const file = files[0]
    if (!acceptedMimes.includes(file.type)) return 'Formato no válido.'

    if (file.size < 32768) return 'El archivo es demasiado pequeño.'
    if (file.size > 10485760) return 'El archivo es demasiado grande.'
  }

  const onSubmit = async (values: FormValues): Promise<void> => {
    setState('loading')
    try {
      const files = await Promise.all([blobToBase64(values.passport[0])])

      await completeKYC({
        name: userData.name as string,
        surname: userData.surname as string,
        email: userData.email as string,
        address1: userData.address1 as string,
        address2: userData.address2 as string,
        city: userData.city as string,
        region: userData.region as string,
        postalCode: userData.postalCode as string,
        birthday: parseInt(
          (
            new Date(
              userData.year as number,
              userData.month as number,
              userData.day as number
            ).getTime() / 1000
          ).toString()
        ),
        nationality: userData.nationality as string,
        files: files as string[],
      })
      setState('success')
    } catch {
      setState('error')
    }
  }

  const onBack = (): void => {
    setState('documentselection')
  }

  return (
    <FormBody
      title="Adjunta tus documentos"
      handleSubmit={handleSubmit(onSubmit)}
      onBack={onBack}
    >
      <Flex>
        <Flex alignItems="center" gap="1rem" minWidth="100%">
          <StyledImg src="/resources/kyc/passport.svg" />
          <Fileinput
            centered
            maxWidth="max(16rem, 20vw)"
            placeholder="Adjuntar pasaporte"
            accept={acceptedMimes.join(',')}
            {...register('passport', {
              required: 'Debes subir una foto del pasaporte.',
              onChange: () => {
                clearErrors('passport')
              },
              validate: validateFile,
            })}
            error={errors.passport}
            file={watch('passport')}
          />
        </Flex>
      </Flex>
    </FormBody>
  )
}
