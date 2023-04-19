import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '@config/firebase'
import { useAuth } from '@context/authContext'
import {
  getDegree,
  getSchool,
  getSubject,
  getUniversities,
  getUniversity,
  uploadFile,
} from '@util/api'
import {
  Button,
  Fileinput,
  Flex,
  Img,
  Input,
  Select,
  Text,
  Textarea,
  Title,
} from '@ui'
import { MAX_PRICE } from '@config/constants'
import { useForm } from 'react-hook-form'
import type { University, School, Degree, Subject } from 'types/api'
import PriceInput from './components/PriceInput'
import { useRouter } from 'next/router'

const TitleImg = styled(Img)`
  @media (max-width: 1200px) {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`

const TitleText = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`

const InputHeader = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const UploadForm = styled.form`
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 3rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  @media (max-width: 1000px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  & p {
    max-width: 100%;
    flex: 1;
  }
`

interface FormValues {
  name: string
  description: string
  university: string
  school: string
  degree: string
  subject: string
  file: FileList
  price: string
}

export default function UploadView({ setState }): JSX.Element {
  const { user } = useAuth()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<FormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' })

  const [data, setData] = useState<{
    universities?: University[]
    schools?: School[]
    degrees?: Degree[]
    subjects?: Subject[]
    maxPrice?: number
  }>({
    universities: undefined,
    schools: undefined,
    degrees: undefined,
    subjects: undefined,
    maxPrice: undefined,
  })

  useEffect(() => {
    getUniversities()
      .then(universities => {
        setData(data => ({ ...data, universities }))
      })
      .catch(e => {})
  }, [])

  useEffect(() => {
    if (watch('university') === '') return
    setData(data => ({
      ...data,
      schools: undefined,
      degrees: undefined,
      subjects: undefined,
      maxPrice: undefined,
    }))

    getUniversity(watch('university'))
      .then(schools => {
        setData(data => ({ ...data, schools: schools.schools }))
      })
      .catch(err => {
        console.log(err)
      })

    setValue('school', '')
    setValue('degree', '')
    setValue('subject', '')
  }, [watch('university')])

  useEffect(() => {
    if (watch('school') === '') return
    setData(data => ({
      ...data,
      degrees: undefined,
      subjects: undefined,
      maxPrice: undefined,
    }))

    getSchool(watch('university'), watch('school'))
      .then(school => {
        setData(data => ({ ...data, degrees: school.degrees }))
      })
      .catch(err => {
        console.log(err)
      })

    setValue('degree', '')
    setValue('subject', '')
  }, [watch('school')])

  useEffect(() => {
    if (watch('degree') === '') return
    setData(data => ({
      ...data,
      subjects: undefined,
      maxPrice: undefined,
    }))

    getDegree(watch('university'), watch('school'), watch('degree'))
      .then(degree => {
        setData(data => ({ ...data, subjects: degree.subjects }))
      })
      .catch(err => {
        console.log(err)
      })

    setValue('subject', '')
  }, [watch('degree')])

  useEffect(() => {
    const subject = watch('subject')
    if (subject === '') {
      setData(data => ({ ...data, maxPrice: MAX_PRICE }))
      return
    }

    getSubject(subject)
      .then(subjectData => {
        setData(data => ({
          ...data,
          maxPrice: subjectData.maxPrice,
        }))
      })
      .catch(() => {})
  }, [watch('subject')])

  useEffect(() => {
    if (user == null) return
    setValue('university', user.data?.university ?? '')
    setValue('price', '1.00€')
  }, [user])

  const onSubmit = async (values: FormValues): Promise<void> => {
    setState('loading')

    const file = values.file[0]
    const price = parseFloat(values.price.replace('€', '').replace(',', '.'))

    const folderName = uuid()

    const storageRef = ref(storage, 'files/' + folderName)

    const fileRef = ref(storageRef, 'inothy-' + file.name)

    const fileSnapshot = await uploadBytes(fileRef, file, {
      customMetadata: { user: user?.uid ?? '', uploadCompleted: 'false' },
    })

    const filePath = fileSnapshot.metadata.fullPath

    try {
      const path = await uploadFile({
        name: values.name,
        description: values.description,
        subject: values.subject,
        filePath,
        requestVerification: false,
        price,
      })

      const docId = path.split('/')[3]

      setState('success')
      await new Promise(resolve => setTimeout(resolve, 2000))
      await push(`/subject/${values.subject}/${docId}`)
    } catch (e) {
      setState('error')
    }
  }

  return (
    <Flex>
      <Flex flexDirection="row">
        <TitleImg src="/icons/upload.svg" width="5rem" aspectRatio="1" />
        <Title>Subir archivo</Title>
      </Flex>
      <UploadForm onSubmit={handleSubmit(onSubmit)}>
        <Flex overflow="hidden">
          <Input
            placeholder="Nombre del documento"
            autoComplete="off"
            {...register('name', {
              required: 'El nombre del documento es obligatorio.',
              maxLength: {
                value: 18,
                message: 'El nombre es demasiado largo.',
              },
              minLength: {
                value: 5,
                message: 'El nombre es demasiado corto.',
              },
            })}
            error={errors.name}
          />

          <Textarea
            placeholder="Descripción"
            autoComplete="off"
            rows={9}
            {...register('description', {
              required: 'La descripción es obligatoria.',
              maxLength: {
                value: 50,
                message: 'La descripción es demasiado larga.',
              },
              minLength: {
                value: 10,
                message: 'La descripción es demasiado corta.',
              },
              onChange: () => {
                clearErrors('description')
              },
            })}
            error={errors.description}
          />

          <Fileinput
            margin="10px 0 0 0"
            {...register('file', {
              required: 'Debes subir un archivo.',
              onChange: () => {
                clearErrors('file')
              },
              validate: value =>
                value[0].size < 100 * 1024 * 1024 ||
                'El tamaño máximo son 100MB.',
            })}
            error={errors.file}
            file={watch('file')}
          />
        </Flex>

        <Flex overflow="hidden">
          <Select
            placeholder="Universidad"
            value={watch('university')}
            {...register('university', {
              required: 'Debes seleccionar una universidad.',
              onChange: () => {
                clearErrors('university')
              },
            })}
            error={errors.university}
          >
            <option value=""></option>
            {data.universities?.map(university => (
              <option key={university.id} value={university.id}>
                {university.name} ({university.symbol})
              </option>
            ))}
          </Select>

          <Select
            placeholder="Facultad"
            {...register('school', {
              required: 'Debes seleccionar una facultad.',
              onChange: () => {
                clearErrors('school')
              },
            })}
            error={errors.school}
          >
            <option value=""></option>
            {data.schools?.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Grado"
            {...register('degree', {
              required: 'Debes seleccionar un grado.',
              onChange: () => {
                clearErrors('degree')
              },
            })}
            error={errors.degree}
          >
            <option value=""></option>
            {data.degrees?.map(degree => (
              <option key={degree.id} value={degree.id}>
                {degree.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Asignatura"
            {...register('subject', {
              required: 'Debes seleccionar una asignatura.',
              onChange: () => {
                clearErrors('subject')
              },
            })}
            error={errors.subject}
          >
            <option value=""></option>
            {data.subjects?.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name} {subject.code != null && `(${subject.code})`}
              </option>
            ))}
          </Select>

          <PriceInput
            {...register('price', {
              required: 'Debes seleccionar una asignatura.',
              pattern: {
                value: /^\d*[.,]?\d{0,2}€?$/,
                message: 'Formato no válido.',
              },
            })}
            error={errors.price}
            setValue={(value: string) => {
              setValue('price', value)
            }}
            value={watch('price')}
            maxPrice={data.maxPrice ?? MAX_PRICE}
          />

          <Button margin="1rem 0 0 0" padding="10px 0" background="primary">
            Subir
          </Button>
        </Flex>
      </UploadForm>
    </Flex>
  )
}
