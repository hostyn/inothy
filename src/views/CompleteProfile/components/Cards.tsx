import styled from 'styled-components'
import { colors } from '@config/theme'

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  min-width: 100%;
  padding: 1px;
  height: 100%;
  overflow: auto;
  margin: 0 0 1rem 0;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.hover};
    border-radius: 10px;
  }
`

export default Cards
