import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../config/theme'
import Img from '@ui/Img'

interface IForm {
  border: keyof typeof colors
  borderRadius?: string
  width?: string
  maxWidth?: string
  height?: string
  margin?: string
  noHide?: boolean
}

const InputDiv = styled.form<IForm>`
  border: 2px solid ${props => colors[props.border ?? 'primary']};
  border-radius: ${props => props.borderRadius ?? '999999px'};
  width: ${props => props.width ?? 'auto'};
  max-width: ${props => props.maxWidth ?? 'auto'};
  height: ${props => props.height ?? '100%'};
  margin: ${props => props.margin ?? '0 1rem'};
  display: flex;
  align-items: center;
  padding: 0 15px;

  ${props =>
    !(props.noHide ?? false) &&
    `
    @media (max-width: 768px) {
    display: none;
  }
  `}
`

const StyledInput = styled.input`
  border: none;
  width: 100%;
  font-size: 1rem;
  font-family: 'VarelaRound';
  margin: 0 10px;
  outline: none;
  background-color: transparent;

  @media (max-width: 500px) {
    ::placeholder {
      color: white;
    }
  }
`

export default function SearchBox({ ...props }: IForm): JSX.Element {
  const [q, setQ] = useState('')
  const { push } = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQ(e.target.value)
  }

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await push('/search?q=' + q, undefined, { shallow: false })
    setQ('')
  }

  return (
    <InputDiv onSubmit={handleSubmit} {...props}>
      <Img
        src="/icons/search.svg"
        width="auto"
        aspectRatio="1"
        height="60%"
      ></Img>
      <StyledInput
        placeholder="Universidad, facultad, carrera o asignatura"
        value={q}
        onChange={handleChange}
      />
    </InputDiv>
  )
}
