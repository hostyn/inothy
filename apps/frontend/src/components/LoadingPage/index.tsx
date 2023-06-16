import Loading from '@components/Loading'
import styled from 'styled-components'

const LoadingDiv = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function LoadingPage(): JSX.Element {
  return (
    <LoadingDiv>
      <Loading />
    </LoadingDiv>
  )
}
