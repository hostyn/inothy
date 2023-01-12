import App from "../components/App";
import styled from "styled-components";
import { colors, sizes } from "../config/theme";
import Text from "../components/Text";
import Img from "../components/Img";
import Span from "../components/Span";

const InfoDiv = styled.div`
  margin: 3rem 10rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    margin: 3rem 6rem;
  }

  @media (max-width: 768px) {
    margin: 3rem 2rem;
  }
`;

const HeaderImg = styled(Img)`
  margin: 2rem 0 8rem 0;
  width: calc(100vw - 20rem);
  height: calc((100vw - 20rem) * 41 / 100);

  @media (max-width: 1200px) {
    width: calc(100vw - 12rem);
    height: calc((100vw - 12rem) * 41 / 100);
    margin: 2rem 0 4rem 0;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 4rem);
    height: calc((100vw - 4rem) * 41 / 100);
    margin: 2rem 0;
  }
`;

const CardDiv = styled.div`
  background-color: ${colors.emphasis};
  border-radius: ${(props) => (props.top ? "2vw 2vw 0 0" : "0")};
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 5vw 1fr 5vw;
  gap: 1rem;
  padding: 2rem;
  align-items: center;
  z-index: 10;

  background-color: ${(props) =>
    props.secondary ? colors.secondary : colors.primary};
  border-radius: 2vw;

  @media (max-width: 1000px) {
    grid-template-columns: 2rem 1fr 5vw;
    padding: 1.5rem;
  }
`;

const CardHeaderText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }
`;

const CardImg = styled(Img)`
  height: 5vw;
  width: 5vw;

  @media (max-width: 1000px) {
    height: 2rem;
    width: 2rem;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${colors.emphasis};
  padding: ${(props) => props.padding || "6rem"};
  border-radius: ${(props) => (props.bottom ? "0 0 2vw 2vw" : "0")};

  @media (max-width: 1200px) {
    padding: ${(props) => props.padding || "4rem"};
  }

  @media (max-width: 1000px) {
    padding: ${(props) => props.padding || "2rem"};
  }
`;

const PricesDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 1200px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PricesImg = styled(Img)`
  grid-column: 1 / 3;
  @media (max-width: 768px) {
    grid-column: 1;
    height: calc((100vw - 8rem) * 0.6 * 5 / 4);
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListElement = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 2rem;
  margin: ${(props) => props.margin || "initial"};

  @media (max-width: 1200px) {
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
  }
`;

const ListIndex = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }
`;

const BodyText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const PaymentImg = styled(Img)`
  @media (max-width: 768px) {
    width: calc(100vw - 8rem);
    height: calc((100vw - 8rem) * 0.7 * 50 / 83);
  }
`;

const BadgeDiv = styled.div`
  display: grid;
  grid-template-columns: 20vw 1fr;
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BadgeDescriptionsDiv = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-auto-rows: 8rem;
  gap: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 4rem 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
  }
`;

const BadgeImg = styled(Img)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const FeesImg = styled(Img)`
  height: calc((100vw - 20rem) * 75 / 88);

  @media (max-width: 1200px) {
    height: calc((100vw - 12rem) * 75 / 88);
  }

  @media (max-width: 768px) {
    height: calc((100vw - 4rem) * 75 / 88);
  }
`;

const VerifiedDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 30vw;
`;

const WhyDiv = styled.div`
  display: grid;
  grid-template-columns: 30vw 1fr;
  grid-template-rows: min-content;
  gap: 4rem;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const WhyImg = styled(Img)`
  @media (max-width: 768px) {
    width: calc((100vw - 8rem) * 0.7);
    height: calc((100vw - 8rem) * 0.7 * 25 / 26);
    justify-self: center;
  }
`;

export default function InfoView() {
  return (
    <App>
      <InfoDiv>
        <Text
          fontSize="5vw"
          color="secondary"
          fontWeight="bold"
          fontFamily="HelveticaRounded"
        >
          Información
        </Text>
        <HeaderImg src="/resources/info/header.svg" width="100%" height="" />
        <CardDiv top>
          <CardHeader>
            <CardImg src="/resources/info/price.svg" />
            <CardHeaderText color="white" fontSize="3vw" fontWeight="bold">
              Precios
            </CardHeaderText>
          </CardHeader>
        </CardDiv>
        <CardBody>
          <PricesDiv>
            <ListElement>
              <ListIndex
                fontSize="6rem"
                fontFamily="HelveticaRounded"
                textAlign="center"
                color="secondary"
                fontWeight="bold"
              >
                1
              </ListIndex>
              <FlexColumn>
                <TitleText
                  fontSize="2.2vw"
                  color="secondary"
                  fontWeight="bold"
                  margin="0 0 1rem 0"
                >
                  ¿Por qué hay precios topes a la hora de subir apuntes en
                  Inothy?
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Para favoreceros a los estudiantes y que los precios que
                  tengáis que pagar por algo que tanto necesitáis sean sólo
                  simbólicos.
                </BodyText>
              </FlexColumn>
            </ListElement>

            <ListElement>
              <ListIndex
                fontSize="6rem"
                fontFamily="HelveticaRounded"
                textAlign="center"
                color="secondary"
                fontWeight="bold"
              >
                2
              </ListIndex>
              <FlexColumn>
                <TitleText
                  fontSize="2.2vw"
                  color="secondary"
                  fontWeight="bold"
                  margin="0 0 1rem 0"
                >
                  ¿Cómo funcionan los precios tope?
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Queremos ser lo más justos posibles, por lo que establecemos
                  los precios topes estadísticamente en función de la oferta y
                  demanda que tenga esa asignatura en específico.
                </BodyText>
              </FlexColumn>
            </ListElement>

            <ListElement>
              <ListIndex
                fontSize="6rem"
                fontFamily="HelveticaRounded"
                textAlign="center"
                color="secondary"
                fontWeight="bold"
              >
                3
              </ListIndex>
              <FlexColumn>
                <TitleText
                  fontSize="2.2vw"
                  color="secondary"
                  fontWeight="bold"
                  margin="0 0 1rem 0"
                >
                  Tipos de precios tope
                </TitleText>
                <BodyText fontSize="1.5vw">
                  2€ para asignaturas de baja demanda.
                </BodyText>
                <BodyText fontSize="1.5vw">
                  3€ para asignaturas de media demanda.
                </BodyText>
                <BodyText fontSize="1.5vw">
                  5€ para asignaturas de alta demanda.
                </BodyText>
                <BodyText fontSize="1.5vw">
                  10€ para asignaturas especiales.
                </BodyText>
              </FlexColumn>
            </ListElement>

            <ListElement>
              <ListIndex
                fontSize="6rem"
                fontFamily="HelveticaRounded"
                textAlign="center"
                color="secondary"
                fontWeight="bold"
              >
                4
              </ListIndex>
              <FlexColumn>
                <TitleText
                  fontSize="2.2vw"
                  color="secondary"
                  fontWeight="bold"
                  margin="0 0 1rem 0"
                >
                  Divide tus apuntes por temas
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Es una opción interesante si le quieres dar más rendimiento a
                  tu trabajo.
                </BodyText>
              </FlexColumn>
            </ListElement>

            <PricesImg src="/resources/info/pricesImg.svg" height="25vw" />

            {/* <ListElement>
              <Text
                fontSize="6rem"
                fontFamily="HelveticaRounded"
                textAlign="center"
                color="secondary"
                fontWeight="bold"
              >
                5
              </Text>
              <FlexColumn>
                <Text
                  fontSize="2.2vw"
                  color="secondary"
                  fontWeight="bold"
                  margin="0 0 1rem 0"
                >
                  Todos los precios tope tiene la opción de subirse
                </Text>
                <Text fontSize="1.5vw">
                  en +1€ si solicitas la verificación de tus apuntes y los
                  aceptamos [Puedes tener más información sobre cómo funcionan
                  las verificaciones aquí]. ¡¡Ojo!! Sólo verificamos los mejores
                  apuntes, deben ser excelentes.
                </Text>
              </FlexColumn>
            </ListElement> */}
          </PricesDiv>
        </CardBody>

        <CardDiv>
          <CardHeader secondary>
            <CardImg src="/resources/info/payment.svg" />
            <CardHeaderText color="white" fontSize="3vw" fontWeight="bold">
              Pagos
            </CardHeaderText>
          </CardHeader>
        </CardDiv>
        <CardBody>
          <PaymentImg
            src="/resources/info/paymentImg.svg"
            width="100%"
            height="20vw"
            margin="0 0 2rem 0"
          />
          <ListElement>
            <ListIndex
              fontSize="6rem"
              fontFamily="HelveticaRounded"
              textAlign="center"
              color="secondary"
              fontWeight="bold"
            >
              1
            </ListIndex>
            <FlexColumn>
              <TitleText
                fontSize="2.2vw"
                color="secondary"
                fontWeight="bold"
                margin="0 0 1rem 0"
              >
                Pagos
              </TitleText>
              <BodyText fontSize="1.5vw">
                Si deseas descargar unos apuntes, podrás pagar instantáneamente
                con tarjeta desde nuestra página web. No hay comisiones añadidas
                a estas operaciones por parte de Inothy.
              </BodyText>
            </FlexColumn>
          </ListElement>
          <ListElement margin="2rem 0 0 0">
            <ListIndex
              fontSize="6rem"
              fontFamily="HelveticaRounded"
              textAlign="center"
              color="secondary"
              fontWeight="bold"
            >
              2
            </ListIndex>
            <FlexColumn>
              <TitleText
                fontSize="2.2vw"
                color="secondary"
                fontWeight="bold"
                margin="0 0 1rem 0"
              >
                Retiros
              </TitleText>
              <BodyText fontSize="1.5vw">
                Si has vendido apuntes y deseas retirar tu dinero podrás hacerlo
                mediante transferencia SEPA a tu cuenta bancaria cuando quieras
                y sin cantidad mínima. Sólo debes ir al{" "}
                <Span fontWeight="bold">Saldo</Span> en tu perfil y solicitar el
                retiro. A los pocos días lo recibirás en tu cuenta bancaria.
              </BodyText>
            </FlexColumn>
          </ListElement>
        </CardBody>

        <CardDiv>
          <CardHeader>
            <CardImg src="/resources/info/badge.svg" />
            <CardHeaderText color="white" fontSize="3vw" fontWeight="bold">
              Insignias
            </CardHeaderText>
          </CardHeader>
        </CardDiv>
        <CardBody>
          <BadgeDiv>
            <BadgeImg src="/resources/info/badgeImg.svg" width="100%" />
            <BadgeDescriptionsDiv>
              <Img src="/badge/ambassador.svg" />
              <FlexColumn>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Embajador
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que se registró en la beta de la página. Los
                  Embajadores tienen un 20% de descuento en apuntes durante este
                  curso.
                </BodyText>
              </FlexColumn>
              <Img src="/badge/bronze.svg" />
              <FlexColumn>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Bronze
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 50 ventas.
                </BodyText>
              </FlexColumn>
              <Img src="/badge/silver.svg" />
              <FlexColumn>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Silver
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 200 ventas.
                </BodyText>
              </FlexColumn>
              <Img src="/badge/gold.svg" />
              <FlexColumn>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Gold
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 500 ventas.
                </BodyText>
              </FlexColumn>
            </BadgeDescriptionsDiv>
          </BadgeDiv>
          <BodyText fontSize="1.5vw" margin="2rem 0 0 0" fontWeight="bold">
            Pronto anunciaremos todos los beneficios de poseer alguna de estas
            insignias.
          </BodyText>
        </CardBody>

        {/* <CardDiv>
          <CardHeader secondary>
            <CardImg src="/resources/info/verified.svg" />
            <Text color="white" fontSize="3vw" fontWeight="bold">
              Apuntes verificados
            </Text>
          </CardHeader>
        </CardDiv>
        <CardBody>
          <VerifiedDiv>
            <div>
              <ListElement>
                <Text
                  fontSize="6rem"
                  fontFamily="HelveticaRounded"
                  textAlign="center"
                  color="secondary"
                  fontWeight="bold"
                >
                  1
                </Text>
                <Text fontSize="1.5vw">
                  Al publicar unos apuntes, o incluso más tarde, tienes la
                  opción de solicitar la verificación del archivo/s que hayas
                  subido, si piensas que lo merece.” “En el momento de tu
                  solicitud, tus apuntes serán revisados por uno de nuestros
                  expertos, que aceptará o denegará la misma en un no superior a
                  30 días.
                </Text>
              </ListElement>
              <ListElement margin="2rem 0 0 0">
                <Text
                  fontSize="6rem"
                  fontFamily="HelveticaRounded"
                  textAlign="center"
                  color="secondary"
                  fontWeight="bold"
                >
                  2
                </Text>
                <Text fontSize="1.5vw">
                  ¿Qué obtienes con la verificación? “En el anuncio de ese
                  documento/s aparecerá un sello de calidad, por lo que tus
                  potenciales compradores podrán asegurarse de que lo que
                  descargan tiene la aceptación de Inothy como documento de
                  calidad superior”. “Además, tendrás la opción de subir el
                  precio de esos apuntes 1€ más de lo que Inothy te permitiera
                  anteriormente para esa asignatura en específico”.
                </Text>
              </ListElement>
              <ListElement margin="2rem 0 0 0">
                <Text
                  fontSize="6rem"
                  fontFamily="HelveticaRounded"
                  textAlign="center"
                  color="secondary"
                  fontWeight="bold"
                >
                  3
                </Text>
                <Text fontSize="1.5vw">
                  Requisitos para obtener la verificación en un documento: Que
                  el usuario sea el autor, es decir, que no exista plagio; buena
                  presentación; y que el contenido sea lo suficientemente
                  extenso, claro para el lector, además de que esté correcto en
                  cuanto a la materia de la que se habla.
                </Text>
              </ListElement>
            </div>
            <Img src="/resources/info/verifiedImg.svg" />
          </VerifiedDiv>
        </CardBody> */}

        <CardDiv>
          <CardHeader secondary>
            <CardImg src="/resources/info/fees.svg" />
            <CardHeaderText color="white" fontSize="3vw" fontWeight="bold">
              Comisiones
            </CardHeaderText>
          </CardHeader>
        </CardDiv>
        <CardBody padding="0">
          <FeesImg src="/resources/info/feesImg.svg" height="50vw" />
        </CardBody>

        <CardDiv>
          <CardHeader>
            <CardImg src="/resources/info/why.svg" />
            <CardHeaderText color="white" fontSize="3vw" fontWeight="bold">
              ¿Por qué solicitamos tanta información?
            </CardHeaderText>
          </CardHeader>
        </CardDiv>
        <CardBody bottom>
          <WhyDiv>
            <WhyImg src="/resources/info/whyImg.svg" />
            <FlexColumn>
              <BodyText fontSize="1.8vw" margin="0 0 1rem 0">
                Por normativa europea estamos obligados a verificar la identidad
                de cualquier persona que reciba dinero de nuestra plataforma. Es
                por eso que a la hora de retirar tu dinero tienes que subir tus
                documentos de identificación.
              </BodyText>
              <BodyText fontSize="1.8vw">
                En ningun momento almacenamos ninguna información sobre tu
                identidad. Esta es manejada por un proveedor regulado por la
                Unión Europea para cumplir con la{" "}
                <Span fontWeight="bold">Ley de Protección de Datos</Span>.
              </BodyText>
            </FlexColumn>
          </WhyDiv>
        </CardBody>
      </InfoDiv>
    </App>
  );
}
