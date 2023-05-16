import App from '@components/App'
import styled from 'styled-components'
import { Flex, Img, Span, Text } from '@ui'
import Card from './components/Card'

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
`

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
`

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
`

const PricesImg = styled(Img)`
  grid-column: 1 / 3;
  @media (max-width: 768px) {
    grid-column: 1;
    height: calc((100vw - 8rem) * 0.6 * 5 / 4);
  }
`

const ListElement = styled.div<{ margin?: string }>`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 2rem;
  margin: ${props => props.margin ?? 'initial'};

  @media (max-width: 1200px) {
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
  }
`

const ListIndex = styled(Text)`
  @media (max-width: 1200px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const TitleText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }
`

const BodyText = styled(Text)`
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`

const PaymentImg = styled(Img)`
  @media (max-width: 768px) {
    width: calc(100vw - 8rem);
    height: calc((100vw - 8rem) * 0.7 * 50 / 83);
  }
`

const BadgeDiv = styled.div`
  display: grid;
  grid-template-columns: 20vw 1fr;
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

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
`

const BadgeImg = styled(Img)`
  @media (max-width: 600px) {
    display: none;
  }
`

const FeesImg = styled(Img)`
  height: calc((100vw - 20rem) * 75 / 88);

  @media (max-width: 1200px) {
    height: calc((100vw - 12rem) * 75 / 88);
  }

  @media (max-width: 768px) {
    height: calc((100vw - 4rem) * 75 / 88);
  }
`

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
`

const WhyImg = styled(Img)`
  @media (max-width: 768px) {
    width: calc((100vw - 8rem) * 0.7);
    height: calc((100vw - 8rem) * 0.7 * 25 / 26);
    justify-self: center;
  }
`

export default function InfoView(): JSX.Element {
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

        <Card title="Precios" img="/resources/info/price.svg" firstElement>
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
              <Flex>
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
              </Flex>
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
              <Flex>
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
              </Flex>
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
              <Flex>
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
              </Flex>
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
              <Flex>
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
              </Flex>
            </ListElement>

            <PricesImg src="/resources/info/pricesImg.svg" height="25vw" />
          </PricesDiv>
        </Card>

        <Card title="Pagos" img="/resources/info/payment.svg" secondary>
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
            <Flex>
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
            </Flex>
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
            <Flex>
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
                y sin cantidad mínima. Sólo debes ir al{' '}
                <Span fontWeight="bold">Saldo</Span> en tu perfil y solicitar el
                retiro. A los pocos días lo recibirás en tu cuenta bancaria.
              </BodyText>
            </Flex>
          </ListElement>
        </Card>

        <Card title="Insignias" img="/resources/info/badge.svg">
          <BadgeDiv>
            <BadgeImg src="/resources/info/badgeImg.svg" width="100%" />
            <BadgeDescriptionsDiv>
              <Img src="/badge/ambassador.svg" />
              <Flex>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Embajador
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que se registró en la beta de la página. Los
                  Embajadores tienen un 20% de descuento en apuntes durante este
                  curso.
                </BodyText>
              </Flex>
              <Img src="/badge/bronze.svg" />
              <Flex>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Bronze
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 50 ventas.
                </BodyText>
              </Flex>
              <Img src="/badge/silver.svg" />
              <Flex>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Silver
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 200 ventas.
                </BodyText>
              </Flex>
              <Img src="/badge/gold.svg" />
              <Flex>
                <TitleText fontSize="2.2vw" color="secondary" fontWeight="bold">
                  Gold
                </TitleText>
                <BodyText fontSize="1.5vw">
                  Usuario que ha alcanzado 500 ventas.
                </BodyText>
              </Flex>
            </BadgeDescriptionsDiv>
          </BadgeDiv>
          <BodyText fontSize="1.5vw" margin="2rem 0 0 0" fontWeight="bold">
            Pronto anunciaremos todos los beneficios de poseer alguna de estas
            insignias.
          </BodyText>
        </Card>

        <Card title="Comisiones" img="/resources/info/fees.svg" secondary>
          <FeesImg src="/resources/info/feesImg.svg" height="50vw" />
        </Card>

        <Card
          title="¿Por qué solicitamos tanta información?"
          img="/resources/info/why.svg"
          lastElement
        >
          <WhyDiv>
            <WhyImg src="/resources/info/whyImg.svg" />
            <Flex>
              <BodyText fontSize="1.8vw" margin="0 0 1rem 0">
                Por normativa europea estamos obligados a verificar la identidad
                de cualquier persona que reciba dinero de nuestra plataforma. Es
                por eso que a la hora de retirar tu dinero tienes que subir tus
                documentos de identificación.
              </BodyText>
              <BodyText fontSize="1.8vw">
                En ningun momento almacenamos ninguna información sobre tu
                identidad. Esta es manejada por un proveedor regulado por la
                Unión Europea para cumplir con la{' '}
                <Span fontWeight="bold">Ley de Protección de Datos</Span>.
              </BodyText>
            </Flex>
          </WhyDiv>
        </Card>
      </InfoDiv>
    </App>
  )
}
