import styled from 'styled-components'
import { colors } from '../../config/theme'

interface ICheckbox {
  children?: JSX.Element | JSX.Element[]
  onChange?: () => unknown
}

const Label = styled.label`
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 0.5rem;
  align-items: center;
  user-select: none;
`

const Input = styled.input`
  height: 1.5rem;
  width: 1.5rem;
`

const Span = styled.span`
  font-family: VarelaRound;
  color: ${colors.primary};
`

export default function Checkbox({
  children,
  onChange,
}: ICheckbox): JSX.Element {
  return (
    <Label>
      <Input type="checkbox" onChange={onChange} />
      <Span>{children}</Span>
    </Label>
  )
}
