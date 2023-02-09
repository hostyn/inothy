import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../config/theme";
import { getUniversities } from "../../util/api";
import Img from "../Img";
import Loading from "../Loading";
import { VirtualizedPage } from "../Carousel/VirtualizedPage";

const CarouselDiv = styled.div`
  width: 100%;
  height: 16rem;

  @media (max-width: 1280px) {
    height: 10rem;
  }

  @media (max-width: 500px) {
    height: 6rem;
  }
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled(Img)`
  height: 12rem;
  width: 12rem;
  border-radius: 99999px;
  border: 3px solid ${colors.primary};
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;

  @media (max-width: 1280px) {
    height: 8rem;
    width: 8rem;
  }

  @media (max-width: 500px) {
    height: 5rem;
    width: 5rem;
  }

  :hover {
    scale: 1.1;
  }
`;

export default function UniversitiesCarousel({
  visualizedItems = 2,
  paddingItems = 2,
}) {
  const [universities, setUniversities] = useState(null);

  useEffect(() => {
    getUniversities().then((universities) => setUniversities(universities));
  }, []);

  return (
    <CarouselDiv>
      {universities ? (
        <VirtualizedPage
          visualizedItems={visualizedItems}
          paddingItems={paddingItems}
        >
          {({ index }) => {
            const modulo = index % universities.length;
            const imageIndex =
              modulo < 0 ? universities.length + modulo : modulo;
            return (
              <ImageDiv>
                <Image
                  draggable={false}
                  alt={universities[imageIndex].name}
                  title={universities[imageIndex].name}
                  src={universities[imageIndex].logoUrl}
                />
              </ImageDiv>
            );
          }}
        </VirtualizedPage>
      ) : (
        <Loading />
      )}
    </CarouselDiv>
  );
}
