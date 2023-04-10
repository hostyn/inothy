import styled from 'styled-components'
import { colors } from '@config/theme'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from 'react'

const SelectDiv = styled.div`
  position: relative;
  margin: 10px 0 5px 0;
  width: 100%;
`

const Label = styled.label`
  position: absolute;
  display: flex;
  bottom: 11px;
  left: 10px;
  background-color: white;
  pointer-events: none;

  transform: translateY(-140%);
  font-size: 0.9rem;
  padding: 0 3px;
  color: ${colors.primary};
`

interface StyledSelectProps {
  border?: string
  margin?: string
  maxWidth?: string
}

const StyledSelect = styled.select<StyledSelectProps>`
  padding: 10px;
  border-radius: 10px;
  border: ${props => props.border ?? `2px solid ${colors.primary}`};
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

interface SelectProps
  extends StyledSelectProps,
    ComponentPropsWithoutRef<'select'> {}

function Select(
  { children, placeholder, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
): JSX.Element {
  return (
    <SelectDiv>
      <StyledSelect {...props} ref={ref}>
        {children}
      </StyledSelect>
      <Label>{placeholder}</Label>
    </SelectDiv>
  )
}

export default forwardRef(Select)
