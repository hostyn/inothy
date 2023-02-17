import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Fileinput from '../../components/Fileinput'
import Img from '../../components/Img'
import Text from '../../components/Text'
import { colors } from '../../config/theme'
import blobToBase64 from '../../util/blobToB64'

const acceptedMimes = ['application/pdf', 'image/jpeg', 'image/png']

const PassportDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const UploadDiv = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
`

const InlineText = styled.div`
  display: flex;
  align-items: center;
`

export default function Passport ({ setState, handleKYCSubmit }) {
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  const handleChange = ({ target }) => {
    setError(null)

    const file = target.files[0]

    if (!acceptedMimes.includes(file.type)) {
      setError('Tipo de archivo no admitido')
      setFile(null)
      return
    }

    if (file.size < 32768) {
      setError('El archivo es demasiado pequeño')
      setFile(null)
      return
    }

    if (file.size > 10485760) {
      setError('El archivo es demasiado grande')
      setFile(null)
      return
    }

    setFile(file)
  }

  const verifyData = () => {
    let anyError = false

    if (!file) {
      setError('Debes subir un archivo')
      anyError = true
    }

    return anyError
  }

  const handleSubmit = async () => {
    const error = verifyData()
    if (error) return

    const b64files = await Promise.all([blobToBase64(file)])

    handleKYCSubmit(b64files)
  }

  return (
    <PassportDiv>
      <Text
        fontSize="2rem"
        color="secondary"
        fontWeight="bold"
        fontFamily="HelveticaRounded"
      >
        PASAPORTE
      </Text>
      <UploadDiv>
        <Img
          src="/resources/kyc/passport.svg"
          height="10rem"
          aspectRatio="37/50"
          width="auto"
        />
        <Text maxWidth="20rem" textAlign="center">
          Adjunte una foto de la página en la que se muestra su información
          personal
        </Text>
        <Fileinput
          accept="application/pdf, image/jpeg, image/png"
          onChange={handleChange}
        >
          Adjuntar foto
        </Fileinput>
        <Text color={error ? 'secondary' : 'disabledColor'} fontSize="1.1rem">
          {error || file?.name}
        </Text>
      </UploadDiv>

      <InlineText>
        <Button
          margin="0 auto 0 0"
          height="auto"
          padding="0.5rem 1rem"
          background="white"
          color="primary"
          border={`2px solid ${colors.primary}`}
          onClick={() => setState('documentselection')}
        >
          Atrás
        </Button>
        <Button
          margin="0"
          height="auto"
          padding="0.5rem 1rem"
          onClick={handleSubmit}
        >
          Subir
        </Button>
      </InlineText>
    </PassportDiv>
  )
}
