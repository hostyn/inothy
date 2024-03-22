import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { Link } from '@ui/Link'
import { useState } from 'react'
import { getSellerAmount } from '@util/priceCalculator'
import { trpc } from '@services/trpc'
import { toastError } from '@services/toaster'

export default function Price({
  next,
  value,
  title,
  data,
  setData,
  ...props
}: StepProps): JSX.Element {
  const [loading, setLoading] = useState(false)

  const upload = trpc.document.upload.useMutation({
    onSuccess: data => {
      setData({
        step: 'document-uploaded',
        ...data,
      })

      setLoading(false)
      next()
    },

    onError: () => {
      toastError('Ha ocurrido un error al subir el documento')
      setLoading(false)
    },
  })

  const [price, setPrice] = useState('1.00')

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target.value.replaceAll(',', '.')

    if (input === '') {
      setPrice('')
      return
    }

    if (!/^(\d+([,.]\d{0,2})?)$/.test(input)) return
    if (Number(input) < 1 || Number(input) > 1000) return

    setPrice(input)
  }

  const handlePriceBlur: React.FocusEventHandler<
    HTMLInputElement
  > = async e => {
    if (e.target.value === '') {
      await new Promise(resolve => setTimeout(resolve, 100))
      setPrice('1.00')
      return
    }

    const input = e.target.value.replaceAll(',', '.')
    setPrice(Number(input).toFixed(2))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (price === '') return

    if (data?.step !== 'upload-document') return

    const reader = new FileReader()
    reader.readAsDataURL(data.file)
    reader.onload = async () => {
      const base64 = reader.result

      upload.mutate({
        file: (base64 as string).split(',')[1],
        contentType: data.file.type,
        extension: data.file.name.split('.').pop() ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        subject: data.subject ?? '',
        documentTypeId: data.documentType ?? '',
        price: Number(price),
        byHand: data.byHand ?? false,
        calification: data.calification ?? undefined,
        professor: data.professor ?? undefined,
        year: data.year ?? undefined,
      })
    }
  }

  return (
    <TabContent
      value={value}
      title={title}
      onSubmit={onSubmit}
      nextText="Subir"
      loading={loading}
      disabled={price === ''}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '5xl',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            gap: 'xl',
            lineHeight: '100%',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              gap: 'md',
              lineHeight: '100%',
            })}
          >
            <h1
              className={css({
                fontSize: '2xl',
                color: 'text',
                fontWeight: '700',
              })}
            >
              ¡Toca fijar el precio!
            </h1>
            <p
              className={css({
                color: 'grey.500',
              })}
            >
              Podrás cambiarlo cuando quieras.
            </p>
          </div>

          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              gap: 'md',
              lineHeight: '100%',
            })}
          >
            <label className={labelInputStyles}>
              <input
                inputMode="decimal"
                onChange={handlePriceChange}
                onBlur={handlePriceBlur}
                className={inputStyles}
                value={price}
                style={{ width: `${price.length}ch` }}
              />
              <span>€</span>
            </label>

            <span
              className={css({
                color: 'grey.400',
              })}
            >
              Tú ganas:{' '}
              {price !== '' ? getSellerAmount(Number(price)).toFixed(2) : '-'} €
            </span>
          </div>
        </div>
        {/* // TODO: Add link to pricing info */}
        <Link href="/info" weight="normal" visual="grey">
          Más información sobre los precios.
        </Link>
      </div>
    </TabContent>
  )
}

const labelInputStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2xl',
  gap: 'sm',
  padding: 'md',

  border: '1px solid token(colors.grey.100)',
  borderRadius: 'md',
  transition: 'outline-width 50ms ease-in-out',
  fontSize: '4xl',
  color: 'text',
  fontWeight: '900',

  _focusWithin: {
    outline: '3px solid token(colors.primary.300)',
  },
})

const inputStyles = css({
  color: 'inherit',
  textAlign: 'right',
  appearance: 'none',

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    appearance: 'none',
  },

  _focus: {
    outline: 'none',
  },
})
