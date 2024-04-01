import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps, UploadData } from '../types'
import Input from '@ui/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const moreInfoSchema = z.object({
  byHand: z.string({ invalid_type_error: 'Tienes seleccionar uno.' }),
  year: z.coerce.number({
    invalid_type_error: 'Debe ser un número.',
  }),
  calification: z.coerce.number({
    invalid_type_error: 'Debe ser un número.',
  }),
  professor: z.string(),
})

type FormValues = z.infer<typeof moreInfoSchema>

export default function MoreInfo({
  next,
  value,
  title,
  setData,
  ...props
}: StepProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(moreInfoSchema),
  })

  const onSubmit = (values: FormValues): void => {
    setData((data: UploadData) => ({
      ...data,
      byHand: Boolean(Number(values.byHand)),
      year: values.year !== 0 ? values.year : null,
      calification: values.calification !== 0 ? values.calification : null,
      professor: values.professor !== '' ? values.professor : null,
    }))

    next()
  }

  return (
    <TabContent
      value={value}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          maxW: '100%',
          gap: 'lg',
          py: 'md',

          md: {
            gap: '3xl',
          },
        })}
      >
        <h1
          className={css({
            fontFamily: 'nunitoSans',
            fontSize: '2xl',
            color: 'text',
            fontWeight: '700',
            lineHeight: '1.2',
          })}
        >
          Solo un poco más de información
        </h1>

        <div
          className={css({
            display: 'flex',
            gap: 'md',
            flexDir: 'column',
            width: '4xl',
            maxW: '100%',

            md: {
              alignItems: 'center',
            },
          })}
        >
          <div className={containerStyles}>
            <h2 className={subtitleStyles}>
              ¿Está hecho a mano o a ordenador?
            </h2>
            <div
              className={css({
                display: 'flex',
                gap: 'sm',
                flexDir: 'column',

                md: {
                  gap: 'md',
                  flexDir: 'row',
                },
              })}
            >
              <label className={radioLabelStyles}>
                <input
                  type="radio"
                  value="1"
                  {...register('byHand', {
                    onChange: () => {
                      clearErrors('byHand')
                    },
                  })}
                  className={radioStyles}
                />
                <span
                  data-invalid={errors.byHand != null ? true : undefined}
                  className={css({
                    _invalid: {
                      border: '1px solid token(colors.red.100)',
                      color: 'red.500',
                    },
                  })}
                >
                  A ordenador
                </span>
              </label>
              <label className={radioLabelStyles}>
                <input
                  type="radio"
                  value="0"
                  {...register('byHand', {
                    onChange: () => {
                      clearErrors('byHand')
                    },
                  })}
                  className={radioStyles}
                />
                <span
                  data-invalid={errors.byHand != null ? true : undefined}
                  className={css({
                    _invalid: {
                      border: '1px solid token(colors.red.100)',
                      color: 'red.500',
                    },
                  })}
                >
                  A mano
                </span>
              </label>
              {/* {errors.byHand?.message} */}
            </div>
          </div>
          <div className={containerStyles}>
            <h2 className={subtitleStyles}>
              ¿En qué año hiciste este documento?{' '}
              <span className={optionalSpanStyles}>Opcional.</span>
            </h2>

            <Input
              type="number"
              nativePlaceholder={String(new Date().getFullYear())}
              className={css({ width: '100%', md: { width: 'xl' } })}
              {...register('year', {
                onChange: () => {
                  clearErrors('year')
                },
              })}
              error={errors.year}
            />
          </div>

          <div className={containerStyles}>
            <h2 className={subtitleStyles}>
              ¿Qué nota sacaste?{' '}
              <span className={optionalSpanStyles}>Opcional.</span>
            </h2>

            <Input
              type="number"
              nativePlaceholder="9.3"
              className={css({ width: '100%', md: { width: 'xl' } })}
              {...register('calification', {
                onChange: () => {
                  clearErrors('calification')
                },
              })}
              error={errors.calification}
            />
          </div>

          <div className={containerStyles}>
            <h2 className={subtitleStyles}>
              ¿Quién era tu profesor?{' '}
              <span className={optionalSpanStyles}>Opcional.</span>
            </h2>

            <Input
              nativePlaceholder="Rubén Martínez"
              className={css({ width: '100%', md: { width: 'xl' } })}
              {...register('professor', {
                onChange: () => {
                  clearErrors('professor')
                },
              })}
              error={errors.professor}
            />
          </div>
        </div>
      </div>
    </TabContent>
  )
}

const radioStyles = css({
  appearance: 'none',
})

const radioLabelStyles = css({
  display: 'flex',
  userSelect: 'none',

  '& span': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'sm',
    border: '1px solid token(colors.grey.100)',
    borderRadius: 'md',
    color: 'grey.500',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'border-color 50ms ease-in-out, color 50ms ease-in-out',
    md: {
      width: 'xl',
    },
  },

  '& input:checked + span': {
    border: '1px solid token(colors.primary.300)',
    outline: '1px solid token(colors.primary.300)',
  },
})

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md',

  md: {
    alignItems: 'center',
  },
})

const subtitleStyles = css({
  fontFamily: 'nunitoSans',
  fontSize: 'lg',
  fontWeight: '700',
  color: 'text',
  lineHeight: '100%',
})

const optionalSpanStyles = css({
  fontSize: 'sm',
  fontWeight: '400',
  color: 'grey.500',
})
