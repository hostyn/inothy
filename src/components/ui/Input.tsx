import styled from 'styled-components'
import { colors } from '@config/theme'
import { type ChangeEvent, forwardRef } from 'react'
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  ChangeHandler,
} from 'react-hook-form'
import Text from './Text'
import Img from './Img'

const InputDiv = styled.div`
  position: relative;
  margin: 10px 0 5px 0;
`

const Label = styled.label`
  position: absolute;
  bottom: 11px;
  left: 10px;
  transition: all 0.2s ease;
  background-color: white;
  pointer-events: none;
  font-size: 1rem;
  color: #8e8e8e;
`

const StyledInput = styled.input<{ error: boolean }>`
  color: ${colors.primary};
  border: ${props =>
    props.error
      ? `2px solid ${colors.secondary}`
      : `2px solid ${colors.primary}`};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  font-family: VarelaRound;
  font-size: 1rem;

  :focus {
    outline: none;
  }

  :focus + ${Label}, :not(:placeholder-shown) + ${Label} {
    transform: translateY(-140%);
    font-size: 0.9rem;
    padding: 0 3px;
    color: ${props => (props.error ? colors.secondary : colors.primary)};
  }
`

const ErrorDiv = styled.div`
  width: 100%;
  height: calc(0.8rem + 5px);
  display: flex;
  padding: 0 0 5px 0;
`

interface InputProps {
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => any
  onBlur: ChangeHandler
  type: string
  name: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

function Input(
  { placeholder, error, ...props }: InputProps,
  ref: React.Ref<any>
): JSX.Element {
  return (
    <>
      <InputDiv>
        <StyledInput
          {...props}
          ref={ref}
          title=""
          placeholder=" "
          error={error != null}
        />
        <Label>{placeholder}</Label>
      </InputDiv>
      <ErrorDiv>
        {error != null && (
          <>
            <Img
              src="/icons/info-error.svg"
              width="1rem"
              height="1rem"
              margin="0 5px"
            />
            <Text margin="0 auto 0 0" color="secondary" fontSize="0.8rem">
              {error?.message?.toString()}
            </Text>
          </>
        )}
      </ErrorDiv>
    </>
  )
}

export default forwardRef(Input)
