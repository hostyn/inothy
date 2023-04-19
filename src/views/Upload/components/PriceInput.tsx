import { MIN_PRICE } from '@config/constants'
import { colors } from '@config/theme'
import { Button, Flex } from '@ui'
import { forwardRef, useEffect } from 'react'
import { type FieldError, type ChangeHandler } from 'react-hook-form'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  position: relative;
  gap: 1rem;
`

const Input = styled.input`
  width: 10rem;
  height: 100%;
  text-align: center;
  border: none;
  font-size: 2.5rem;
  color: ${colors.primary};
  font-family: VarelaRound;
`

interface PriceInputProps {
  onChange?: ChangeHandler
  onBlur?: ChangeHandler
  name: string
  error?: FieldError
  setValue: (value: string) => void
  value: string
  maxPrice: number
}

function PriceInput(
  { setValue, maxPrice, value, ...props }: PriceInputProps,
  ref: React.Ref<any>
): JSX.Element {
  const onBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value.replace('€', '').replace(',', '.'))
    setValue(`${value.toFixed(2)}€`)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    if (/^(?:\d+[.,]?\d{0,2}€?|)$/.test(value)) {
      setValue(value.replaceAll('.', ','))
    }
  }

  const handleDownPrice = (): void => {
    const valueNumber = parseFloat(value.replace('€', '').replace(',', '.'))
    if (valueNumber - 1 < MIN_PRICE) {
      setValue(`${MIN_PRICE.toFixed(2)}€`)
    } else {
      setValue(`${(valueNumber - 1).toFixed(2)}€`)
    }
  }

  const handleUpPrice = (): void => {
    const valueNumber = parseFloat(value.replace('€', '').replace(',', '.'))
    if (valueNumber + 1 > maxPrice) {
      setValue(`${maxPrice.toFixed(2)}€`)
    } else {
      setValue(`${(valueNumber + 1).toFixed(2)}€`)
    }
  }

  useEffect(() => {
    if (value == null) return
    const valueNumber = parseFloat(value.replace('€', '').replace(',', '.'))
    if (valueNumber > maxPrice) {
      setValue(`${maxPrice.toFixed(2)}€`)
    }
  }, [maxPrice])

  return (
    <StyledFlex flexDirection="row" alignItems="center" justifyContent="center">
      <Button
        onClick={handleDownPrice}
        type="button"
        background="white"
        height="3rem"
        width="3rem"
        margin="0"
        padding="0"
        fontSize="2rem"
        color="primary"
        border={`2px solid ${colors.primary}`}
      >
        -
      </Button>
      <Input
        {...props}
        value={value ?? ''}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Button
        onClick={handleUpPrice}
        type="button"
        background="white"
        height="3rem"
        width="3rem"
        margin="0"
        padding="0"
        fontSize="2rem"
        color="primary"
        border={`2px solid ${colors.primary}`}
      >
        +
      </Button>
    </StyledFlex>
  )
}

export default forwardRef(PriceInput)
