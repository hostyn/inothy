import styled from 'styled-components'
import { colors, sizes } from '../config/theme'

const Button = styled.button`
  font-family: ${(props) => props.fontFamily || 'VarelaRound'};
  font-size: ${(props) => props.fontSize || sizes.buttonText};
  background: ${(props) => colors[props.background] || colors.primary};
  color: ${(props) => colors[props.color] || 'white'};
  border-radius: ${(props) => props.borderRadius || '999999px'};
  border: ${(props) => props.border || 'none'};
  height: ${(props) => props.height || '100%'};
  width: ${(props) => props.width || 'initial'};
  margin: ${(props) => props.margin || '0 1em'};
  padding: ${(props) => props.padding || '0'};
  grid-column: ${(props) => props.gridColumn || 'initial'};
  cursor: pointer;
  transition: 0.2s;

  :hover:enabled {
    scale: 1.05;
  }

  :disabled {
    background-color: ${colors.disabledButton};
  }
`

export default Button
