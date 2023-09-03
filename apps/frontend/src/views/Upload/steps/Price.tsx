import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import { Link } from '@ui/Link'
import { useState } from 'react'
import { getSellerAmount } from '@util/priceCalculator'

export default function Price({
  next,
  value,
  title,
  setData,
  ...props
}: StepProps): JSX.Element {
  const [price, setPrice] = useState('')

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const input = e.target.value.replaceAll(',', '.')

    console.log(input)

    if (input === '') {
      setPrice('')
      return
    }

    if (!/^(\d+([,.]\d{0,2})?)$/.test(input)) return
    if (Number(input) < 1 || Number(input) > 1000) return

    setPrice(input)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault()
    next()
  }

  return (
    <TabContent value={value} title={title} onSubmit={onSubmit} {...props}>
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
            <p>Podrás cambiarlo cuando quieras.</p>
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
                onChange={handlePriceChange}
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
              Tu ganas: {price !== '' ? getSellerAmount(Number(price)) : '-'} €
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
