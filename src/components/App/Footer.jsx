import styled from "styled-components";
import { colors, sizes } from "../../config/theme";
import A from "../A";
import Img from "../Img";
import Text from "../Text";

const FooterDiv = styled.footer`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.footer};
  max-height: ${sizes.footer};

  box-sizing: border-box;
  background-color: ${colors.primary};
  padding: 1rem 15%;

  display: grid;
  grid-template-columns: 18% 18% 28% 12% 12% 12%;
  gap: 1rem;
  align-items: center;
  text-align: center;
`;

const Contacto = styled.div`
  background-image: url("/resources/footer/background.svg");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;

  aspect-ratio: 1910/641;

  display: grid;
  grid-template-columns: 40% 60%;

  padding: 0 15rem;

  align-items: center;
  justify-items: center;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RRSS = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0 0 0;
`;

const RRSSButton = styled.a`
  aspect-ratio: 1;
  background-color: ${(props) => colors[props.background] || colors.primary};
  padding: 1.3rem;
  border-radius: 99999px;
  margin: 0 1rem;
  width: 6rem;
`;

export default function Footer() {
  return (
    <>
      <Contacto>
        <Img src="/resources/footer/resource.svg" aspectRatio="83/75" />
        <TextDiv>
          <Text fontFamily="HelveticaRounded" fontSize="4rem">
            Contactemos
          </Text>
          <RRSS>
            <RRSSButton
              target="_blank"
              href="https://www.instagram.com/_inothy/"
            >
              <Img src="/icons/instagram.svg" aspectRatio="1" />
            </RRSSButton>
            <RRSSButton
              background="secondary"
              target="_blank"
              href="https://mobile.twitter.com/_inothy"
            >
              <Img src="/icons/twitter.svg" aspectRatio="1" />
            </RRSSButton>
          </RRSS>
        </TextDiv>
      </Contacto>
      <FooterDiv>
        <A color="white" fontWeight="regular" fontSize="1.2rem">
          ¿Por qué inothy?
        </A>
        <A color="white" fontWeight="regular" fontSize="1.2rem">
          ¿Cómo funciona?
        </A>
        <Img src="/isologo.svg" />
        <A color="white" fontWeight="regular" fontSize="1.2rem">
          Legal
        </A>
        <A color="white" fontWeight="regular" fontSize="1.2rem">
          Cookies
        </A>
        <A color="white" fontWeight="regular" fontSize="1.2rem">
          Contacto
        </A>
      </FooterDiv>
    </>
  );
}
