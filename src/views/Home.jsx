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
  margin: 0 9rem;
  padding: ${(props) =>
      props.verified ? sizes.navbar : `calc(${sizes.navbar} + ${sizes.banner})`}
    0 0 0;
`;

const FloatingDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
`;

const IdeaFrameDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
  margin: 10rem 0 0 0;
`;

const IdeaFrameText = styled.div`
  display: flex;
  flex-direction: column;
`;

const PorqueGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 10rem 0 0 0;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 2rem;
  gap: 2rem;
`;

const UniversidadesDiv = styled.div`
  margin: 10rem 0 0 0;
  display: flex;
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

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ComoGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ComoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
`;

export default function HomeView() {
  const { openModal } = useModal();
  const { user } = useAuth();

  return (
    <App transparent>
      <Home verified={user && user.emailVerified}>
        <Img
          src="/resources/home/resource1.svg"
          aspectRatio="1064/866"
          alt="resource1"
        />

        <FloatingDiv>
          <Text fontFamily="WaffleStory" fontSize="5rem" textAlign="center">
            Bienvenid@
          </Text>
          <Text
            fontFamily="WaffleStory"
            fontSize="2rem"
            textAlign="center"
            color="secondary"
          >
            acabas de dar el
          </Text>
          <Text fontFamily="WaffleStory" fontSize="2rem" textAlign="center">
            primer paso
          </Text>
          <Text
            fontFamily="WaffleStory"
            fontSize="3rem"
            textAlign="center"
            color="secondary"
          >
            para aprobar
          </Text>
          <Text
            fontFamily="VarelaRound"
            fontSize="1.2rem"
            textAlign="center"
            margin="1rem auto"
          >
            Al igual que tú, sabemos lo importante que es tener unos buenos
            apuntes. Que todo sea fácil de entender y que te ayuden a optimizar
            el tiempo. De cualquier carrera, y cualquier asignatura, tenemos lo
            que necesitas. No paramos de crecer.{" "}
            <Span color="secondary">¿empezamos?</Span>
          </Text>
          <Button
            margin="1rem auto"
            padding="0.5rem 2rem"
            onClick={() => openModal(<AuthModal selected="register" />)}
          >
            Apuntes
          </Button>
        </FloatingDiv>

        {/* Porque inothy */}
        <IdeaFrameDiv>
          <Img src="/resources/home/resource2.svg" aspectRatio="550/371" />
          <IdeaFrameText>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="7rem"
              fontWeight="bold"
            >
              ¿Por qué
            </Text>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="7rem"
              fontWeight="bold"
              color="secondary"
              textAlign="right"
            >
              INOTHY?
            </Text>
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
            <div>
              <Text
                fontFamily="HelveticaRounded"
                fontSize="3.5rem"
                fontWeight="bold"
                color="secondary"
              >
                Material de calidad
              </Text>
              <Text fontSize="1.7rem">
                En Inothy buscamos la calidad antes que cantidad, por ello se
                realizan verificaciones del material, para evitar plagios y
                estafas
              </Text>
            </div>
          </Card>
          <Card>
            <Img src="/resources/home/porque2.svg" />
            <div>
              <Text
                fontFamily="HelveticaRounded"
                fontSize="3.5rem"
                fontWeight="bold"
                color="secondary"
              >
                Precios justos
              </Text>
              <Text fontSize="1.7rem">
                Compra y vende de madnera libre. Gana dinero mensualmente por tu
                trabajo y esfuerzo
              </Text>
            </div>
          </Card>
          <Card>
            <Img src="/resources/home/porque3.svg" />
            <div>
              <Text
                fontFamily="HelveticaRounded"
                fontSize="3.5rem"
                fontWeight="bold"
                color="secondary"
              >
                Sin publicidad
              </Text>
              <Text fontSize="1.7rem">
                Navegar por Inothy nunca había sido tan fácil. Puedes centrarte
                al 100% en tu trabajo sin que te molesten los anuncios.
              </Text>
            </div>
          </Card>
        </PorqueGrid>

        {/* Necesitas ayuda con alguna asignatura */}
        <IdeaFrameDiv>
          <IdeaFrameText>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="4rem"
              textAlign="center"
            >
              <Span color="secondary">¿</Span>Necesitas ayuda
            </Text>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="4rem"
              textAlign="center"
            >
              con alguna asignatura<Span color="secondary">?</Span>
            </Text>
            <Text
              fontFamily="VarelaRound"
              fontSize="2rem"
              margin="3rem 0 0 0"
              color="secondary"
            >
              Tenemos los apuntes que tanta falta te hacen.
            </Text>
            <Text
              fontFamily="VarelaRound"
              fontSize="2rem"
              textAlign="right"
              color="secondary"
            >
              De cualquier carrera y cualquier asignatura.
            </Text>
          </IdeaFrameText>
          <Img
            src="/resources/home/necesitas.svg"
            aspectRatio="173/150"
            width="95%"
          />
        </IdeaFrameDiv>

        {/* Universidades */}
        <UniversidadesDiv>
          <Img src="/resources/home/pen1.svg" height="auto" />
          <Text
            color="secondary"
            fontFamily="HelveticaRounded"
            fontSize="6rem"
            margin="0 3rem"
          >
            Universidades
          </Text>
          <Img src="/resources/home/pen2.svg" height="auto" />
        </UniversidadesDiv>
        <UniversidadesGrid>
          <div
            style={{
              aspectRatio: "1",
              border: "5px solid red",
              borderRadius: "99999px",
              margin: "4rem",
            }}
          ></div>
          <div
            style={{
              aspectRatio: "1",
              border: "5px solid red",
              borderRadius: "99999px",
              margin: "4rem",
            }}
          ></div>
          <div
            style={{
              aspectRatio: "1",
              border: "5px solid red",
              borderRadius: "99999px",
              margin: "4rem",
            }}
          ></div>
          <div
            style={{
              aspectRatio: "1",
              border: "5px solid red",
              borderRadius: "99999px",
              margin: "4rem",
            }}
          ></div>
        </UniversidadesGrid>
        <Img src="/resources/home/pen3.svg" aspectRatio="150/1" />

        {/* Consigue tus apuntes en dos clicks */}
        <IdeaFrameDiv>
          <Img
            src="/resources/home/dosclicks.svg"
            aspectRatio="141/150"
            width="80%"
          />
          <IdeaFrameText>
            <Text
              fontFamily="HelveticaRounded"
              textAlign="center"
              fontSize="4rem"
            >
              Consigue tus
            </Text>
            <Text
              fontFamily="HelveticaRounded"
              textAlign="center"
              fontSize="4rem"
            >
              apuntes en <Span color="secondary">dos clics</Span>
            </Text>
            <Text
              color="secondary"
              fontSize="2rem"
              textAlign="center"
              margin="2rem 0 0 0"
            >
              ¿Te has quedado sin tiempo
            </Text>
            <Text color="secondary" fontSize="2rem" textAlign="center">
              Te lo dejamos todo fácil y organizado
            </Text>
          </IdeaFrameText>
        </IdeaFrameDiv>

        {/* Asegurate tu aprobado */}

        <IdeaFrameDiv>
          <IdeaFrameText>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="4rem"
              textAlign="center"
            >
              Asegúrate tu
            </Text>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="4rem"
              textAlign="center"
            >
              aprobado
            </Text>
            <Text
              fontSize="2rem"
              color="secondary"
              textAlign="center"
              margin="2rem 0 0 0"
            >
              Comprobamos la calidad de nuestro apuntes
            </Text>
            <Text fontSize="2rem" color="secondary" textAlign="center">
              Dónde los mejores estudiantes suben su material
            </Text>
          </IdeaFrameText>
          <Img
            src="/resources/home/asegurate.svg"
            aspectRatio="153/150"
            width="70%"
          />
        </IdeaFrameDiv>

        {/* Crees que tienes los mejores apuntes */}
        <IdeaFrameDiv>
          <MejoresText>
            <Text fontFamily="HelveticaRounded" fontSize="3rem">
              ¿crees que tienes los
            </Text>
            <Text
              fontFamily="HelveticaRounded"
              fontSize="3rem"
              color="secondary"
            >
              mejores apuntes?
            </Text>
            <Text fontSize="2rem" color="secondary" margin="1rem 0 0 0 ">
              ¿quiéres ganar dinero
            </Text>
            <Text fontSize="2rem" color="secondary">
              ayudando a otros estudiantes?
            </Text>
            <Text fontSize="1.5rem" margin="1rem 0 0 0">
              Inothy es tu sitio
            </Text>
            <Button
              height="auto"
              padding="0.5rem 2rem"
              margin="1rem 0 0 0 "
              onClick={() => openModal(<AuthModal selected="register" />)}
            >
              Registrate
            </Button>
          </MejoresText>
          <Img src="/resources/home/resource4.svg" aspectRatio="31/30" />
        </IdeaFrameDiv>
        <Text
          fontFamily="HelveticaRounded"
          fontSize="5rem"
          margin="5rem 0"
          textAlign="center"
        >
          ¿Cómo funciona?
        </Text>
        <ComoGrid>
          <ComoCard>
            <Img
              src="/resources/home/resource5.svg"
              aspectRatio="1"
              width="70%"
              margin="0 0 2rem 0"
            />
            <Text fontSize="2rem" textAlign="center">
              Unete a nuestra comunidad y no olvides verificar tu correo para
              continuar con el proceso.
            </Text>
          </ComoCard>
          <ComoCard>
            <Img
              src="/resources/home/resource6.svg"
              aspectRatio="1"
              width="70%"
              margin="0 0 2rem 0"
            />
            <Text fontSize="2rem" textAlign="center">
              Sube material académico de manera fácil y sencilla con lan solo un
              click. Puedes subir cualquier tipo de archivo.
            </Text>
            <Text color="secondary" fontSize="2rem" textAlign="center">
              (pdf, doc, excel, ppt, jpg, txt...)
            </Text>
          </ComoCard>
          <ComoCard>
            <Img
              src="/resources/home/resource7.svg"
              aspectRatio="1"
              width="70%"
              margin="0 0 2rem 0"
            />
            <Text fontSize="2rem" textAlign="center">
              Designa un precio coherente de tu material académico. Te guiaremos
              con el mejor precio de venta.
            </Text>
          </ComoCard>
          <ComoCard>
            <Img
              src="/resources/home/resource8.svg"
              aspectRatio="1"
              width="70%"
              margin="0 0 2rem 0"
            />
            <Text fontSize="2rem" textAlign="center">
              Compra apuntes de otros usuarios, según tus preferencias. Podrás
              ver las valoraciones y aptitudes de cada usuario.
            </Text>
          </ComoCard>
        </ComoGrid>
      </Home>
    </App>
  );
}
