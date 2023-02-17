import styled from 'styled-components'
import { colors } from '../../config/theme'
import { VirtualizedPage } from '../Carousel/VirtualizedPage'
import Text from '../Text'
import Img from '../Img'
import Span from '../Span'

const SoonCarouselDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${colors.secondary};
  padding: 2rem;
  gap: 2rem;
  border-radius: 10px;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 400px) {
    padding: 2rem 1rem;
  }
`

const CarouselDiv = styled.div`
  height: 15rem;
  width: 100%;

  @media (max-width: 400px) {
    height: 10rem;
  }
`

const CardDiv = styled.div`
  background-color: ${colors.secondary};
  border: 5px solid ${colors.white};
  border-radius: 5px;
  height: inherit;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 2rem;
  justify-content: space-around;

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`

const Logo = styled(Img)`
  height: 4rem;
  width: 4rem;

  @media (max-width: 400px) {
    height: 3rem;
    width: 3rem;
  }
`

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const CardText = styled(Text)`
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`
const items = [
  {
    logo: '/resources/home/ratings.svg',
    text: 'Valoraciones'
  },
  {
    logo: '/resources/home/comments.svg',
    text: 'Comentarios'
  },
  {
    logo: '/resources/home/maxprice.svg',
    text: 'Cambio de precios tope'
  },
  {
    logo: '/resources/home/report.svg',
    text: 'Sistema de reportes'
  },
  {
    logo: '/resources/home/statistics.svg',
    text: 'Estadísticas'
  }
]

export default function SoonCarousel ({
  visualizedItems = 2,
  paddingItems = 2
}) {
  return (
    <SoonCarouselDiv>
      <Title fontSize="3rem" color="white" fontFamily="HelveticaRounded">
        Pronto en <Span fontWeight="bold">Inothy</Span>
      </Title>
      <CarouselDiv>
        <VirtualizedPage
          visualizedItems={visualizedItems}
          paddingItems={paddingItems}
        >
          {({ index }) => {
            const modulo = index % items.length
            const itemIndex = modulo < 0 ? items.length + modulo : modulo
            return (
              <CardDiv>
                <Logo src={items[itemIndex].logo} />
                <CardText fontSize="1.8rem" color="white" fontWeight="bold">
                  {items[itemIndex].text}
                </CardText>
              </CardDiv>
            )
          }}
        </VirtualizedPage>
      </CarouselDiv>
    </SoonCarouselDiv>
  )
}
