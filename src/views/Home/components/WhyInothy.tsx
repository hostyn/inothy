import { Flex, Img, Text } from '@ui'
import styled from 'styled-components'

const WhyDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: 10rem 0 0 0;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 5rem 0 0 0;
  }
`

const StyledTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const StyledSubTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 2rem;
  }
`

const StyledText = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`

const PorqueImg = styled(Img)`
  @media (max-width: 750px) {
    width: 100%;
    height: calc((100vw - 4rem) * 25 / 37);
  }
`

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 10rem 0 0 0;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 4rem;
    margin: 5rem 0 0 0;
  }
`

const Card = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  padding: 0;
  gap: 1rem;
`

export default function WhyInothy(): JSX.Element {
  return (
    <>
      <WhyDiv>
        <PorqueImg src="/resources/home/resource2.svg" aspectRatio="37/25" />
        <Flex>
          <StyledTitle
            fontFamily="HelveticaRounded"
            fontSize="5vw"
            fontWeight="bold"
          >
            ¿Por qué
          </StyledTitle>
          <StyledTitle
            fontFamily="HelveticaRounded"
            fontSize="6vw"
            fontWeight="bold"
            color="secondary"
            textAlign="right"
          >
            INOTHY?
          </StyledTitle>
          <Img
            src="/resources/home/resource3.svg"
            width="80%"
            height="auto"
            aspectRatio="300/20"
            margin="0 0 0 auto"
          />
        </Flex>
      </WhyDiv>
      <WhyGrid>
        <Card>
          <Img src="/resources/home/porque1.svg" />
          <Flex>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              fontSize="2.5rem"
              fontWeight="bold"
              color="secondary"
            >
              Material de calidad
            </StyledSubTitle>
            <StyledText fontSize="1.5rem" lineHeight="1.5">
              En Inothy buscamos la calidad antes que cantidad, por ello se
              realizan verificaciones del material, para evitar plagios y
              estafas.
            </StyledText>
          </Flex>
        </Card>
        <Card>
          <Img src="/resources/home/porque2.svg" />
          <Flex>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              fontSize="2.5rem"
              fontWeight="bold"
              color="secondary"
            >
              Precios justos
            </StyledSubTitle>
            <StyledText fontSize="1.5rem" lineHeight="1.5">
              Compra y vende de manera libre. Gana dinero mensualmente por tu
              trabajo y esfuerzo.
            </StyledText>
          </Flex>
        </Card>
        <Card>
          <Img src="/resources/home/porque3.svg" />
          <Flex>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              fontSize="2.5rem"
              fontWeight="bold"
              color="secondary"
            >
              Sin publicidad
            </StyledSubTitle>
            <StyledText fontSize="1.5rem" lineHeight="1.5">
              Encontrar lo que buscas nunca había sido tan fácil. Puedes
              centrarte al 100% en tu trabajo sin que te molesten los anuncios.
            </StyledText>
          </Flex>
        </Card>
      </WhyGrid>
    </>
  )
}
