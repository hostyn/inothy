import UniversitiesCarousel from '@components/UniversitiesCarousel/UniversitiesCarousel'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { Img, Text } from '@ui'
import styled from 'styled-components'

const UniversidadesDiv = styled.div`
  margin: 10rem 0 0 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`

const StyledText2 = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }
`

export default function Universities(): JSX.Element {
  const { width } = useWindowDimensions()

  const calcVisualizedItems = (): number => {
    if (width < 600) return 3
    if (width > 1280) return Math.trunc(width / 300)
    return Math.trunc(width / 200)
  }
  return (
    <>
      <UniversidadesDiv>
        <Img src="/resources/home/pen1.svg" height="auto" />
        <StyledText2
          color="secondary"
          fontFamily="HelveticaRounded"
          fontSize="5vw"
          margin="0 3vw"
        >
          Universidades
        </StyledText2>
        <Img src="/resources/home/pen2.svg" height="auto" />
      </UniversidadesDiv>
      <UniversitiesCarousel
        visualizedItems={calcVisualizedItems()}
        paddingItems={Math.trunc(calcVisualizedItems() / 2) + 1}
      />
      <Img src="/resources/home/pen3.svg" aspectRatio="150/1" height="25px" />
    </>
  )
}
