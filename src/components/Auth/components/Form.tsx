import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;

  text-align: center;
  width: 100%;
  padding: 0 5rem;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`

export default Form
