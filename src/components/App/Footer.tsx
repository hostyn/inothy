import Link from 'next/link'
import styled from 'styled-components'
import { colors, sizes } from '@config/theme'
import { A, Flex, Img, Text } from '@ui'

interface RRSButtonProps {
  background?: keyof typeof colors
}

const FooterDiv = styled.footer`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.footer};
  max-height: ${sizes.footer};

  box-sizing: border-box;
  background-color: ${colors.primary};
  padding: 1rem ${sizes.inlineMargin};

  display: grid;
  grid-template-columns: repeat(2, 1fr) 13rem repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
  text-align: center;

  @media (max-width: 1000px) {
    grid-template-columns: 13rem;
    padding: 1rem calc((100% - 13rem) / 2);
  }
`

const Contacto = styled.div`
  background-image: url('/resources/footer/background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;

  aspect-ratio: 1910/641;

  display: grid;
  grid-template-columns: 40% 60%;

  padding: 0 10vw;
  margin: 0 4vw;

  height: calc(92vw * 641 / 1920);

  align-items: center;
  justify-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    & p {
      font-size: 6vw;
    }
  }
`

const RRSSButton = styled.a<RRSButtonProps>`
  aspect-ratio: 1;
  background-color: ${props => colors[props.background ?? 'primary']};
  padding: 1.7vw;
  border-radius: 99999px;
  margin: 0 2vw;
  width: 7vw;
  height: 7vw;

  @media (max-width: 600px) {
    padding: 2.2vw;
    width: 10vw;
    height: 10vw;
    margin: 0 4vw;
  }
`

const HiddenLink = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`

const HiddenImg = styled(Img)`
  @media (max-width: 600px) {
    display: none;
  }
`

export default function Footer(): JSX.Element {
  return (
    <>
      <Contacto>
        <HiddenImg
          src="/resources/footer/resource.svg"
          aspectRatio="83/75"
          width="100%"
          height="auto"
        />
        <TextDiv>
          <Text fontFamily="HelveticaRounded" fontSize="4vw" textAlign="center">
            Únete a la comunidad
          </Text>
          <Flex justifyContent="center" flexDirection="row" margin="1vw 0 0 0">
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
          </Flex>
        </TextDiv>
      </Contacto>
      <FooterDiv>
        <HiddenLink>
          <Link href="/info" passHref>
            <A
              color="white"
              fontWeight="regular"
              fontSize="1.2rem"
              textAlign="center"
            >
              Información
            </A>
          </Link>
        </HiddenLink>

        <HiddenLink>
          <Link href="/legal" passHref>
            <A
              color="white"
              fontWeight="regular"
              fontSize="1.2rem"
              textAlign="center"
            >
              Términos y condiciones
            </A>
          </Link>
        </HiddenLink>
        <Link href="/" passHref>
          <a style={{ height: '100%' }}>
            <Img src="/isologo.svg" priority />
          </a>
        </Link>
        <HiddenLink>
          <Link href="/privacy" passHref>
            <A
              color="white"
              fontWeight="regular"
              fontSize="1.2rem"
              textAlign="center"
            >
              Política de privacidad
            </A>
          </Link>
        </HiddenLink>
        <HiddenLink>
          <Link href="/cookies" passHref>
            <A
              color="white"
              fontWeight="regular"
              fontSize="1.2rem"
              textAlign="center"
            >
              Cookies
            </A>
          </Link>
        </HiddenLink>
      </FooterDiv>
    </>
  )
}
