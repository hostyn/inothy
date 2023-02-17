import styled from 'styled-components'
import Button from '../../../components/Button'
import { colors } from '../../../config/theme'

const ButtonGrid = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const StyledButton = styled(Button)`
  width: 10rem;
  border: ${(props) => (props.back ? `2px solid ${colors.primary}` : 'none')};
  background: ${(props) => (props.back ? colors.white : colors.primary)};
  color: ${(props) => (props.back ? colors.primary : colors.white)};
  margin: ${(props) => (props.back ? '0' : '0 0 0 auto')};

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 7rem;
  }
`

export default ButtonGrid
