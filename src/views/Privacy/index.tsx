import styled from 'styled-components'
import App from '@components/App'
import { sizes } from '@config/theme'
import { Span, Text } from '@ui'

const PrivacyDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem ${sizes.inlineMargin};

  @media (max-width: 1000px) {
    margin: 2rem;
  }

  @media (max-width: 768px) {
    margin: 1rem;
  }
`

const Title = styled(Text)`
  margin: 1rem 0 0.2rem 0;
  font-size: 1.3rem;
  font-weight: bold;
`

const P = styled(Text)`
  margin: 0 0 0.5rem 0;
  color: black;
  line-height: 1.4rem;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0 0.5rem 0;
`

export default function PrivacyView(): JSX.Element {
  return (
    <App>
      <PrivacyDiv>
        <Text fontSize="1.5rem" fontWeight="bold" margin="0 0 1rem 0">
          POLÍTICA DE PRIVACIDAD
        </Text>
        <P>
          Esta es la{' '}
          <Span fontWeight="bold">Política de Privacidad de INOTHY</Span>, la
          cual es aplicable al tratamiento de datos personales que realizamos a
          través de nuestra <Span fontWeight="bold">Plataforma</Span>, la cual
          incluye nuestra página web y aplicación, y que forma parte integrante
          de nuestro <Span fontWeight="bold">Acuerdo con el Usuario</Span>.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY OÜ</Span> respeta y protege la
          privacidad. A continuación, detallamos cómo tratamos tus datos
          personales
        </P>
        <P>
          Contacto Usuarios: <Span color="secondary">contact@inothy.com</Span>
        </P>
        <P>
          Contacto Empresas: <Span color="secondary">inothy@inothy.com</Span>
        </P>

        <Text fontSize="1.5rem" fontWeight="bold" margin="1rem 0 0 0">
          Protección de Datos
        </Text>

        <Title>
          Normativa aplicable y principios de Protección de Datos Personales
        </Title>
        <P>
          La recogida de <Span fontWeight="bold">datos personales</Span>, el
          tratamiento y su utilización posterior por parte de{' '}
          <Span fontWeight="bold">INOTHY OÜ</Span> está sujeta al Reglamento UE
          2016/671 General de Protección de Datos, de fecha 27 de abril de 2016
          (en adelante por sus siglas en inglés, el GDPR).
        </P>
        <P>
          En <Span fontWeight="bold">INOTHY</Span> tratamos los{' '}
          <Span fontWeight="bold">datos personales</Span> de nuestros{' '}
          <Span fontWeight="bold">Usuarios</Span> conforme a los siguientes
          principios que se establecen en la propia normativa:
        </P>
        <Ul>
          <li>
            <P>
              Tratar los datos de los <Span fontWeight="bold">Usuarios</Span>{' '}
              con licitud, lealtad y transparencia.
            </P>
          </li>
          <li>
            <P>
              Tratar los datos de forma limitada a la finalidad por la que
              fueron recogidos.
            </P>
          </li>
          <li>
            <P>
              <Span fontWeight="bold">Minimización de datos</Span>: Se recogerán
              de los <Span fontWeight="bold">Usuarios</Span> sólo los datos que
              son realmente necesarios para el correcto desarrollo de nuestros{' '}
              <Span fontWeight="bold">Servicios</Span>.
            </P>
          </li>
          <li>
            <P>Exactitud</P>
          </li>
          <li>
            <P>
              Integridad y <Span fontWeight="bold">confidencialidad</Span>{' '}
              garantizando seguridad al <Span fontWeight="bold">Usuario</Span>.
            </P>
          </li>
        </Ul>

        <Title>¿Con qué fines recogemos tus datos personales?</Title>
        <P>
          INOTHY únicamente utiliza tus datos personales para las siguientes
          finalidades:
        </P>
        <Ul>
          <li>
            <P>
              Prestarte de una manera nuestros{' '}
              <Span fontWeight="bold">Servicios</Span> y que puedas acceder de
              forma simple y sencilla a los apuntes que más relevancia tienen
              para ti.
            </P>
          </li>
          <li>
            <P>
              Atender tus peticiones o dudas y demás asuntos que como{' '}
              <Span fontWeight="bold">Usuario</Span>
              tengas la necesidad de tratar con nosotros.
            </P>
          </li>
          <li>
            <P>
              Mantenerte informado sobre nuestros{' '}
              <Span fontWeight="bold">Servicios</Span>, las novedades en los
              mismos y las promociones.
            </P>
          </li>
          <li>
            <P>
              Para que los apuntes que quieras vender le puedan llegar al
              público indicado, y así puedas obtener la compensación económica
              que deseas por ellos.
            </P>
          </li>
          <li>
            <P>
              Facilitarte cualquier tipo de publicidad si así nos lo has
              consentido y para que esta esté de acuerdo con tus intereses.
            </P>
          </li>
          <li>
            <P>
              Realizar estadísticas, conocer el tráfico, su origen y
              características, cómo se está utilizando nuestra{' '}
              <Span fontWeight="bold">Plataforma</Span>, la determinación de tus
              gustos y preferencias y demás.
            </P>
          </li>
        </Ul>

        <Title>¿Cómo recogemos tus datos personales?</Title>
        <P>
          En <Span fontWeight="bold">INOTHY</Span> sólo recogemos y tratamos
          datos personales cuando tenemos el consentimiento del{' '}
          <Span fontWeight="bold">Usuario</Span> al aceptar los términos del
          presente documento y al aceptar cualquier formulario de los que le
          demos la opción en cualquier momento desde su registro en la{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          Si, en cualquier caso, el <Span fontWeight="bold">Usuario</Span> se
          registrara con una red social de las que la{' '}
          <Span fontWeight="bold">Plataforma</Span> ofrece la posibilidad,{' '}
          <Span fontWeight="bold">INOTHY</Span> se compromete a sólo tratar los
          datos que sean necesarios para el registro de la misma manera que si
          lo hiciera mediante el método basado en el correo electrónico,
          garantizando que no usaremos ni almacenaremos más datos de las redes
          sociales de los <Span fontWeight="bold">Usuarios</Span>.
        </P>

        <Title>Bases legales</Title>
        <P>Sólo tratamos datos personales en los siguientes casos:</P>
        <Ul>
          <li>
            <P>
              Cuando disponemos del consentimiento del{' '}
              <Span fontWeight="bold">Usuario</Span>.
            </P>
          </li>
          <li>
            <P>
              Cuando el tratamiento de dichos datos sea para la satisfacción de
              los intereses legítimos de <Span fontWeight="bold">INOTHY</Span>,
              prevaleciendo siempre los derechos de privacidad del{' '}
              <Span fontWeight="bold">Usuario</Span>.
            </P>
          </li>
          <li>
            <P>
              Cuando el tratamiento sea necesario para ejecutar un contrato y/o
              cuando estemos legalmente obligados a ello.
            </P>
          </li>
        </Ul>

        <Title>¿Con qué terceros compartimos tus datos?</Title>
        <P>
          Compartiremos tus datos con nuestros{' '}
          <Span fontWeight="bold">proveedores</Span>, en caso de tenerlos, y
          asegurando que se garantiza la seguridad de dichos datos personales,
          así como con <Span fontWeight="bold">terceras empresas</Span> que
          colaboren de cualquier manera con nosotros, si así nos lo autoriza el{' '}
          <Span fontWeight="bold">Usuario</Span>.
        </P>

        <Title>¿Qué derechos tienes como Usuario de INOTHY?</Title>
        <P>
          Como <Span fontWeight="bold">Usuario</Span> de la{' '}
          <Span fontWeight="bold">Plataforma</Span> puedes ejercitar tus{' '}
          <Span fontWeight="bold">derechos de privacidad</Span> en cualquier
          momento y de forma gratuita según establece la normativa aplicable,
          tales como:
        </P>

        <Ul>
          <li>
            <P>
              Conocer qué datos personales hemos recabado y tratado, para qué
              finalidades y con qué terceros los hemos compartido, así como las
              razones que nos han llevado a ello.
            </P>
          </li>
          <li>
            <P>Obtener una copia de dichos datos.</P>
          </li>
          <li>
            <P>
              Solicitar la rectificación de los datos personales que sean
              erróneos o inexactos.
            </P>
          </li>
          <li>
            <P>
              Solicitar la supresión de los datos personales que le conciernan
              cuando dejen de ser necesarios para el uso y desarrollo de la{' '}
              <Span fontWeight="bold">Plataforma</Span>.
            </P>
          </li>
          <li>
            <P>Ejecutar el derecho a la portabilidad de datos.</P>
          </li>
          <li>
            <P>
              Ejecutar el derecho a oponerse a dicho tratamiento de datos por
              parte de <Span fontWeight="bold">INOTHY</Span>.
            </P>
          </li>
        </Ul>
        <P>
          Para ejecutar todos estos derechos descritos puedes dirigirte a
          nosotros a través de nuestra dirección de correo electrónico:{' '}
          <Span color="secondary">contact@inothy.com</Span>.
        </P>

        <Title>Compromiso de la veracidad de los datos</Title>
        <P>
          Recordamos que el <Span fontWeight="bold">Usuario</Span> es el único
          responsable de la información facilitada a la{' '}
          <Span fontWeight="bold">Plataforma</Span> y responde de su adecuación
          y veracidad en todo caso.
        </P>
        <P>
          Es por ello por lo que <Span fontWeight="bold">INOTHY</Span> se
          declara no responsable de todos aquellos datos que no sean verdaderos
          o adecuados.
        </P>

        <Title>Cambios en la política de tratamiento</Title>
        <P>
          <Span fontWeight="bold">INOTHY</Span> se reserva el derecho de
          modificar en cualquier momento su{' '}
          <Span fontWeight="bold">Política de Privacidad</Span> y tratamiento.
          En cualquier caso, <Span fontWeight="bold">INOTHY</Span> siempre
          reflejará todos los cambios de forma transparente y visible en el
          presente documento y así se lo hará saber al{' '}
          <Span fontWeight="bold">Usuario</Span> por los medios posibles.
        </P>
      </PrivacyDiv>
    </App>
  )
}
