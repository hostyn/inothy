import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../config/theme'
import Img from './Img'

const InputDiv = styled.form`
  border: 2px solid ${(props) => colors[props.border] || colors.primary};
  border-radius: ${(props) => props.borderRadius || '999999px'};
  width: ${(props) => props.width || 'auto'};
  max-width: ${(props) => props.maxWidth || 'auto'};
  height: ${(props) => props.height || '100%'};
  margin: ${(props) => props.margin || '0 1rem'};
  display: flex;
  align-items: center;
  padding: 0 15px;

  ${(props) =>
    !props.noHide &&
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
  font-family: "VarelaRound";
  margin: 0 10px;
  outline: none;
  background-color: transparent;

  @media (max-width: 500px) {
    ::placeholder {
      color: white;
    }
  }
`

export default function SearchBox ({ ...props }) {
  const [q, setQ] = useState('')
  const { push } = useRouter()

  const handleChange = (e) => {
    setQ(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    push('/search?q=' + q, null, { shallow: false })
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
