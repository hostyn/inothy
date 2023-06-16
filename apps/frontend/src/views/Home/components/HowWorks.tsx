import { Img, Text } from '@ui'
import styled from 'styled-components'

const ComoGrid = styled.div`
  margin: 4rem 0 5rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 30rem;
  gap: 5rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    margin: 2rem 0;
  }
`

const ComoCard = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-rows: 1fr auto auto;
  align-items: center;
`

const StyledTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`

export default function HowWorks(): JSX.Element {
  return (
    <>
      <StyledTitle
        fontFamily="HelveticaRounded"
        fontSize="5vw"
        textAlign="center"
      >
        ¿Cómo funciona?
      </StyledTitle>
      <ComoGrid>
        <ComoCard>
          <Img
            src="/resources/home/resource5.svg"
            height="100%"
            margin="0 0 2rem 0"
          />
          <StyledText fontSize="2rem" textAlign="center">
            Unete a nuestra comunidad y no olvides verificar tu correo para
            continuar con el proceso.
          </StyledText>
        </ComoCard>
        <ComoCard>
          <Img
            src="/resources/home/resource6.svg"
            height="100%"
            margin="0 0 2rem 0"
          />
          <StyledText fontSize="2rem" textAlign="center">
            Sube material académico de manera fácil y sencilla con lan solo un
            click. Puedes subir cualquier tipo de archivo.
          </StyledText>
          <StyledText color="secondary" fontSize="2rem" textAlign="center">
            (pdf, doc, excel, ppt, zip, rar...)
          </StyledText>
        </ComoCard>
        <ComoCard>
          <Img
            src="/resources/home/resource7.svg"
            height="100%"
            margin="0 0 2rem 0"
          />
          <StyledText fontSize="2rem" textAlign="center">
            Designa un precio coherente de tu material académico. Te guiaremos
            con el mejor precio de venta.
          </StyledText>
        </ComoCard>
        <ComoCard>
          <Img
            src="/resources/home/resource8.svg"
            height="100%"
            margin="0 0 2rem 0"
          />
          <StyledText fontSize="2rem" textAlign="center">
            Compra apuntes de otros usuarios, según tus preferencias. Podrás ver
            las valoraciones y aptitudes de cada usuario.
          </StyledText>
        </ComoCard>
      </ComoGrid>
    </>
  )
}
