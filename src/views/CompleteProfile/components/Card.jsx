import styled from 'styled-components'
import Img from '../../../components/Img'
import Text from '../../../components/Text'
import { colors } from '../../../config/theme'

const Card = styled.div`
  border-radius: 10px;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;

  height: min-content;

  align-items: center;

  cursor: pointer;
  padding: 5px 1rem;
  transition: background-color 0.2s;

  background-color: ${(props) =>
    props.selected ? colors.disabledBackground : 'transparent'};

  border: ${(props) =>
    props.selected ? `1px solid ${colors.secondary}` : 'initial'};

  &:hover {
    background-color: ${colors.hover};
  }
`

export const CardText = styled(Text)`
  font-size: 1.5rem;
  user-select: none;
  cursor: inherit;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const CardImg = styled(Img)`
  height: 3rem;
  width: 3rem;
`

export default Card
