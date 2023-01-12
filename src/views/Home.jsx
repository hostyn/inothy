import App from "../components/App";
import styled from "styled-components";
import { sizes } from "../config/theme";
import Img from "../components/Img";
import Text from "../components/Text";
import Button from "../components/Button";
import Span from "../components/Span";
import { useModal } from "../context/modalContext";
import AuthModal from "../components/Auth/AuthModal";
import { useAuth } from "../context/authContext";

const Home = styled.div`
  min-height: inherit;
  background-image: url("/resources/home/background.svg");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;
  margin: 0 5rem;
  padding: ${(props) =>
      props.verified ? sizes.navbar : `calc(${sizes.navbar} + ${sizes.banner})`}
    5rem 0 5rem;

  @media (max-width: 1000px) {
    margin: 0 3rem;
    padding: ${(props) =>
        props.verified
          ? sizes.navbar
          : `calc(${sizes.navbar} + ${sizes.banner})`}
      0 0 0;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: ${(props) =>
        props.verified
          ? sizes.navbar
          : `calc(${sizes.navbar} + ${sizes.banner})`}
      2rem 0 2rem;
  }
`;

const FirstImageDiv = styled.div`
  background-image: url("/resources/home/resource1.svg");
  background-repeat: no-repeat;
  background-size: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  aspect-ratio: 92/75;
  width: 100%;
  height: calc((100vw - 20rem) * 75 / 92);

  @media (max-width: 1000px) {
    height: calc((100vw - 6rem) * 75 / 92);
  }

  @media (max-width: 768px) {
    background-image: url("/resources/home/resource1mobile.svg");
    height: calc((100vw - 4rem) * 1037 / 1142);
  }
`;

const FloatingDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -20%;
`;

const WelcomeText = styled(Text)`
  @media (max-width: 768px) {
    margin: 4vw 0 0 0;
    font-size: 7vw;
  }
`;

const WelcomeSubtext = styled(Text)`
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const WelcomeEphasis = styled(Text)`
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const WelcomeButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const IdeaFrameDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: ${(props) => props.margin || "10rem 0 0 0"};

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 5rem 0 0 0;
  }
`;

const IdeaFrameText = styled.div`
  display: grid;
  flex-direction: column;
`;

const PorqueImg = styled(Img)`
  @media (max-width: 750px) {
    width: 100%;
    height: calc((100vw - 4rem) * 25 / 37);
  }
`;

const PorqueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 10rem 0 0 0;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 4rem;
    margin: 5rem 0 0 0;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  padding: 0;
  gap: 1rem;
`;

const UniversidadesDiv = styled.div`
  margin: 10rem 0 0 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

const UniversidadesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const MejoresText = styled.div`
  background-image: url("/resources/home/background2.svg");
  background-repeat: no-repeat;
  background-size: auto;
  background-position: top center;
  padding: 20% 10% 10% 10%;

  width: 100%;
  height: calc((100vw - 20rem) / 2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    height: calc(100vw - 4rem);
    padding: 3rem 0 0 0;
  }
`;

const MejoresImg = styled(Img)`
  width: calc((100vw - 20rem) / 2);
  height: calc((100vw - 20rem) / 2 * 0.8 * 30 / 31);

  @media (max-width: 1000px) {
    width: calc((100vw - 6rem) / 2);
    height: calc((100vw - 6rem) / 2 * 0.8 * 30 / 31);
  }

  @media (max-width: 768px) {
    width: calc((100vw - 4rem) / 2);
    height: calc((100vw - 4rem) / 2 * 0.8 * 30 / 31);
  }

  @media (max-width: 750px) {
    width: calc((100vw - 4rem));
    height: calc((100vw - 4rem) * 0.8 * 30 / 31);
  }
`;

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
`;

const ComoCard = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-rows: 1fr auto auto;
  align-items: center;
`;

const StyledTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 3rem;
  }
`;

const StyledSubTitle = styled(Text)`
  @media (max-width: 750px) {
    font-size: 2rem;
  }
`;

const StyledText = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
`;

const StyledText2 = styled(Text)`
  @media (max-width: 750px) {
    font-size: 1.5rem;
  }
`;

const HelpImg = styled(Img)`
  @media (max-width: 750px) {
    height: calc((100vw - 4rem) * 150 / 173);
  }
`;

const TwoImg = styled(Img)`
  height: calc((100vw - 20rem) / 2 * 0.8 * 150 / 141);

  @media (max-width: 1000px) {
    height: calc((100vw - 6rem) * 0.8 * 150 / 141);
  }

  @media (max-width: 768px) {
    height: calc((100vw - 4rem) * 0.8 * 150 / 141);
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: 750px) {
    font-size: 1rem;
    padding: 0.3rem 1rem;
  }
`;

export default function HomeView() {
  const { openModal } = useModal();
  const { user } = useAuth();

  return (
    <App transparent>
      <Home verified={user ? user.emailVerified : true}>
        <FirstImageDiv>
          <FloatingDiv>
            <WelcomeText
              fontFamily="WaffleStory"
              fontSize="5vw"
              textAlign="center"
            >
              Bienvenid@
            </WelcomeText>
            <WelcomeSubtext
              fontFamily="WaffleStory"
              fontSize="2vw"
              textAlign="center"
              color="secondary"
            >
              acabas de dar el
            </WelcomeSubtext>
            <WelcomeSubtext
              fontFamily="WaffleStory"
              fontSize="2vw"
              textAlign="center"
            >
              primer paso
            </WelcomeSubtext>
            <WelcomeEphasis
              fontFamily="WaffleStory"
              fontSize="3vw"
              textAlign="center"
              color="secondary"
            >
              para aprobar
            </WelcomeEphasis>
            {/* <Text
              fontFamily="VarelaRound"
              fontSize="1.2rem"
              textAlign="center"
              margin="1rem auto"
            >
              Al igual que tú, sabemos lo importante que es tener unos buenos
              apuntes. Que todo sea fácil de entender y que te ayuden a
              optimizar el tiempo. De cualquier carrera, y cualquier asignatura,
              tenemos lo que necesitas. No paramos de crecer.{" "}
              <Span color="secondary">¿empezamos?</Span>
            </Text> */}
            <WelcomeButton
              margin="1vw auto auto auto"
              padding="0.7vw 2vw"
              fontSize="1.5vw"
              onClick={() => openModal(<AuthModal selected="register" />)}
            >
              Apuntes
            </WelcomeButton>
          </FloatingDiv>
        </FirstImageDiv>
        {/* <Img
          src="/resources/home/resource1.svg"
          aspectRatio="1064/866"
          alt="resource1"
        /> */}

        {/* Porque inothy */}
        <IdeaFrameDiv>
          <PorqueImg src="/resources/home/resource2.svg" aspectRatio="37/25" />
          <IdeaFrameText>
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
              StyledTitleAlign="right"
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
          </IdeaFrameText>
        </IdeaFrameDiv>
        <PorqueGrid>
          <Card>
            <Img src="/resources/home/porque1.svg" />
            <div style={{ display: "flex", flexDirection: "column" }}>
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
            </div>
          </Card>
          <Card>
            <Img src="/resources/home/porque2.svg" />
            <div style={{ display: "flex", flexDirection: "column" }}>
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
            </div>
          </Card>
          <Card>
            <Img src="/resources/home/porque3.svg" />
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                centrarte al 100% en tu trabajo sin que te molesten los
                anuncios.
              </StyledText>
            </div>
          </Card>
        </PorqueGrid>

        {/* Necesitas ayuda con alguna asignatura */}
        <IdeaFrameDiv>
          <IdeaFrameText>
            <StyledTitle
              fontFamily="HelveticaRounded"
              fontSize="6vw"
              textAlign="center"
            >
              <Span color="secondary">¿</Span>Necesitas ayuda
            </StyledTitle>
            <StyledTitle
              fontFamily="HelveticaRounded"
              fontSize="6vw"
              textAlign="center"
            >
              con alguna asignatura<Span color="secondary">?</Span>
            </StyledTitle>
            <StyledText2
              fontFamily="VarelaRound"
              fontSize="3vw"
              margin="3rem 0 0 0"
              color="secondary"
            >
              Tenemos los apuntes que tanta falta te hacen.
            </StyledText2>
            <StyledText2
              fontFamily="VarelaRound"
              fontSize="3vw"
              color="secondary"
            >
              De cualquier carrera y cualquier asignatura.
            </StyledText2>
          </IdeaFrameText>
          <HelpImg src="/resources/home/necesitas.svg" aspectRatio="173/150" />
        </IdeaFrameDiv>

        {/* Universidades */}
        {/* <UniversidadesDiv>
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
        <UniversidadesGrid>
          <div
            style={{
              border: "3px solid red",
              borderRadius: "99999px",
              height: "16vw",
              width: "16vw",
              margin: "1rem auto",
            }}
          ></div>
          <div
            style={{
              border: "3px solid red",
              borderRadius: "99999px",
              height: "16vw",
              width: "16vw",
              margin: "1rem auto",
            }}
          ></div>
          <div
            style={{
              border: "3px solid red",
              borderRadius: "99999px",
              height: "16vw",
              width: "16vw",
              margin: "1rem auto",
            }}
          ></div>
          <div
            style={{
              border: "3px solid red",
              borderRadius: "99999px",
              height: "16vw",
              width: "16vw",
              margin: "1rem auto",
            }}
          ></div>
        </UniversidadesGrid>
        <Img src="/resources/home/pen3.svg" aspectRatio="150/1" height="10px" /> */}

        {/* Consigue tus apuntes en dos clicks */}
        <IdeaFrameDiv>
          <TwoImg
            src="/resources/home/dosclicks.svg"
            aspectRatio="141/150"
            width="80%"
          />
          <IdeaFrameText>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              textAlign="center"
              fontSize="4vw"
            >
              Consigue tus
            </StyledSubTitle>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              textAlign="center"
              fontSize="4vw"
            >
              apuntes en <Span color="secondary">dos clics</Span>
            </StyledSubTitle>
            <StyledText
              color="secondary"
              fontSize="2rem"
              textAlign="center"
              margin="2rem 0 0 0"
            >
              ¿Te has quedado sin tiempo?
            </StyledText>
            <StyledText color="secondary" fontSize="2rem" textAlign="center">
              Te lo dejamos todo fácil y organizado.
            </StyledText>
          </IdeaFrameText>
        </IdeaFrameDiv>

        {/* Asegurate tu aprobado */}

        <IdeaFrameDiv>
          <IdeaFrameText>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              fontSize="4vw"
              textAlign="center"
            >
              Asegúrate tu
            </StyledSubTitle>
            <StyledSubTitle
              fontFamily="HelveticaRounded"
              fontSize="4vw"
              textAlign="center"
            >
              aprobado
            </StyledSubTitle>
            <StyledText
              fontSize="2rem"
              color="secondary"
              textAlign="center"
              margin="2rem 0 0 0"
              width="100%"
            >
              Comprobamos la calidad de nuestro apuntes.
            </StyledText>
            <StyledText
              fontSize="2rem"
              color="secondary"
              textAlign="center"
              width="100%"
            >
              Dónde los mejores estudiantes suben su material.
            </StyledText>
          </IdeaFrameText>
          <Img
            src="/resources/home/asegurate.svg"
            aspectRatio="153/150"
            width="70%"
          />
        </IdeaFrameDiv>

        {/* Crees que tienes los mejores apuntes */}
        <IdeaFrameDiv margin="5rem 0">
          <MejoresText>
            <StyledText2
              fontFamily="HelveticaRounded"
              fontSize="2.5vw"
              textAlign="center"
            >
              ¿Crees que tienes los{" "}
              <Span color="secondary">mejores apuntes?</Span>
            </StyledText2>

            <StyledText fontSize="2vw" color="secondary" textAlign="center">
              ¿Quiéres ganar dinero ayudando a otros estudiantes?
            </StyledText>

            <StyledText fontSize="2vw">Inothy es tu sitio.</StyledText>
            <StyledButton
              height="auto"
              padding="0.5rem 2rem"
              margin="1vw 0 0 0 "
              onClick={() => openModal(<AuthModal selected="register" />)}
            >
              Registrate
            </StyledButton>
          </MejoresText>
          <MejoresImg
            src="/resources/home/resource4.svg"
            aspectRatio="31/30"
            margin="0 0 2rem 0"
          />
        </IdeaFrameDiv>
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
              Compra apuntes de otros usuarios, según tus preferencias. Podrás
              ver las valoraciones y aptitudes de cada usuario.
            </StyledText>
          </ComoCard>
        </ComoGrid>
      </Home>
    </App>
  );
}
