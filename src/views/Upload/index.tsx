import { useState } from 'react'
import styled from 'styled-components'
import App from '@components/App'
import { colors, sizes } from '@config/theme'
import Loading from '@components/Loading'
import ErrorSuccess from '@components/ErrorSuccessPage'
import Upload from './Upload'
import MotionDiv from '@components/MotionDiv'

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};
  padding: 3rem;

  border: 3px solid ${colors.primary};
  border-radius: 20px;
  min-height: calc(100vh - ${sizes.navbar} - 6rem);
  justify-content: center;
  transition: 0.3s;

  @media (max-width: 1000px) {
    margin: 2rem;
    min-height: calc(100vh - ${sizes.navbar} - 4rem);
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem;
    min-height: calc(100vh - ${sizes.navbar} - 2rem);
  }
`

export default function UploadView(): JSX.Element {
  const [state, setState] = useState('upload')

  return (
    <App>
      <UploadDiv>
        <MotionDiv state={state}>
          {state === 'upload' && <Upload setState={setState} />}

          {state === 'loading' && <Loading />}

          {state === 'success' && (
            <ErrorSuccess
              type="success"
              title="Archivo subido"
              subtitle="Compartelo para que lo vea mas gente."
            />
          )}

          {state === 'error' && (
            <ErrorSuccess
              type="error"
              title="Ha habido un problema"
              subtitle="Intentalo mas tarde o contacta con el soporte."
            />
          )}
        </MotionDiv>
      </UploadDiv>
    </App>
  )
}
