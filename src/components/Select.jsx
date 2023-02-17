import styled from 'styled-components'
import { colors } from '../config/theme'

const Select = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: ${(props) => props.border || `2px solid ${colors.primary}`};
  font-family: inherit;
  color: ${colors.primary};
  background-color: transparent;
  font-size: 1rem;
  margin: ${(props) => props.margin || '0'};
  outline: none;
  max-width: ${(props) => props.maxWidth || 'initial'};

  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  background-image: url("/icons/down_arrow.svg");
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

export default Select
