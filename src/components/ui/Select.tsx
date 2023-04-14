import styled from 'styled-components'
import { colors } from '@config/theme'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from 'react'
import Flex from './Flex'
import Text from './Text'
import Img from './Img'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

const SelectDiv = styled.div`
  position: relative;
  margin: 10px 0 5px 0;
  width: 100%;
`

const Label = styled.label<{ error: boolean }>`
  position: absolute;
  display: flex;
  bottom: 11px;
  left: 10px;
  background-color: white;
  pointer-events: none;
  user-select: none;

  transform: translateY(-140%);
  font-size: 0.9rem;
  padding: 0 3px;
  color: ${props => (props.error ? colors.secondary : colors.primary)};
`

interface StyledSelectProps {
  border?: string
  margin?: string
  maxWidth?: string
  error: boolean
}

const StyledSelect = styled.select<StyledSelectProps>`
  padding: 10px;
  border-radius: 10px;
  border: ${props =>
    props.error
      ? `2px solid ${colors.secondary}`
      : `2px solid ${colors.primary}`};
  font-family: inherit;
  color: ${colors.primary};
  background-color: transparent;
  font-size: 1rem;
  margin: ${props => props.margin ?? '0'};
  outline: none;
  max-width: ${props => props.maxWidth ?? 'initial'};
  width: 100%;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  background-image: url('/icons/down_arrow.svg');
  background-repeat: no-repeat;
  background-position: calc(100% - 1rem) center;
  background-size: 1rem;

  overflow: hidden;

  &:disabled {
    opacity: 1;
    color: ${colors.disabledColor};
    background-color: ${colors.disabledBackground};
  }
`

const ErrorDiv = styled.div`
  width: 100%;
  height: calc(0.8rem + 5px);
  display: flex;
  padding: 0 0 5px 0;
`

interface SelectProps
  extends Omit<StyledSelectProps, 'error'>,
    ComponentPropsWithoutRef<'select'> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

function Select(
  { children, placeholder, error, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
): JSX.Element {
  return (
    <Flex>
      <SelectDiv>
        <StyledSelect {...props} error={error != null} ref={ref}>
          {children}
        </StyledSelect>
        <Label error={error != null}>{placeholder}</Label>
      </SelectDiv>
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
    </Flex>
  )
}

export default forwardRef(Select)
