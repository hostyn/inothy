import styled from 'styled-components'
import blobToBase64 from '@util/blobToB64'
import { Fileinput, Flex, Img } from '@ui'
import FormBody from '@components/FormBody'
import { useForm } from 'react-hook-form'
import { type KYCBaseProps } from '.'
import { completeKYC } from '@util/api'

const acceptedMimes = ['application/pdf', 'image/jpeg', 'image/png']

const DniGrid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`

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
  front: FileList
  back: FileList
}

export default function Dni({
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
      const files = await Promise.all([
        blobToBase64(values.front[0]),
        blobToBase64(values.back[0]),
      ])

      await completeKYC({
        name: userData.name ,
        surname: userData.surname ,
        email: userData.email ,
        address1: userData.address1 ,
        address2: userData.address2 ,
        city: userData.city ,
        region: userData.region ,
        postalCode: userData.postalCode ,
        birthday: parseInt(
          (
            new Date(
              userData.year ,
              userData.month ,
              userData.day 
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
      <DniGrid>
        <Flex alignItems="center" gap="1rem" minWidth="100%">
          <StyledImg src="/resources/kyc/front.svg" />
          <Fileinput
            centered
            maxWidth="max(16rem, 20vw)"
            placeholder="Adjuntar anverso"
            accept={acceptedMimes.join(',')}
            {...register('front', {
              required: 'Debes subir el anverso del documento.',
              onChange: () => {
                clearErrors('front')
              },
              validate: validateFile,
            })}
            error={errors.front}
            file={watch('front')}
          />
        </Flex>

        <Flex alignItems="center" gap="1rem" minWidth="100%">
          <StyledImg src="/resources/kyc/back.svg" />
          <Fileinput
            centered
            maxWidth="max(16rem, 20vw)"
            placeholder="Adjuntar reverso"
            accept={acceptedMimes.join(',')}
            {...register('back', {
              required: 'Debes subir el reverso del documento.',
              onChange: () => {
                clearErrors('back')
              },
            })}
            error={errors.back}
            file={watch('back')}
          />
        </Flex>
      </DniGrid>
    </FormBody>
  )
}
