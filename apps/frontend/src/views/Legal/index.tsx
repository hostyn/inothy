import styled from 'styled-components'
import App from '@components/App'
import { sizes } from '@config/theme'
import { Span, Text } from '@ui'

const LegalDiv = styled.div`
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

export default function LegalView(): JSX.Element {
  return (
    <App>
      <LegalDiv>
        <Text fontSize="1.5rem" fontWeight="bold" margin="0 0 1rem 0">
          TÉRMINOS Y CONDICIONES
        </Text>
        <P>
          Bienvenido a <Span fontWeight="bold">INOTHY</Span> y muchas gracias
          por escoger nuestra plataforma. En cuanto aceptes los siguientes{' '}
          <Span fontWeight="bold">términos y condiciones</Span> que proponemos
          para el correcto uso de nuestra plataforma, pasarás a formar parte de
          nuestra comunidad.
        </P>
        <P>
          Es de vital importancia que los leas y comprendas todas las
          condiciones que se proponen en el contrato.
        </P>
        <P>
          <Span fontWeight="bold">Inothy OÜ</Span> es una sociedad limitada bajo
          las leyes de Estonia, con dirección en Harju maakond, Tallinn,
          Lasnamäe linnaosa, Lõõtsa tn 2a, 11415 y registrada bajo las
          autoridades de Estonia con número de registro 16579634, autorizada
          para llevar a cabo actividades comerciales en la red, tal y como
          realizamos en la presenta <Span fontWeight="bold">Plataforma</Span>.
        </P>

        <Title>Información General</Title>
        <P>
          Contacto Usuarios: <Span color="secondary">contact@inothy.com</Span>
        </P>
        <P>
          Contacto Empresas: <Span color="secondary">inothy@inothy.com</Span>
        </P>

        <Title>Las Condiciones</Title>
        <P>
          Estas <Span fontWeight="bold">Condiciones de Uso</Span> establecen las
          obligaciones, los derechos y las relaciones contractuales entre{' '}
          <Span fontWeight="bold">INOTHY OÜ</Span> y los{' '}
          <Span fontWeight="bold">usuarios</Span> que estén registrados en los
          servicios que ofrecemos. Es por eso, que, al registrarte, aceptas que
          las presentes condiciones, así como la{' '}
          <Span fontWeight="bold">Política de Privacidad</Span> y cualquier
          aviso legal que sea publicado desde la fecha de tu registro en
          adelante por parte de <Span fontWeight="bold">INOTHY OÜ</Span>. Estos
          constituirán el acuerdo completo entre{' '}
          <Span fontWeight="bold">Inothy OÜ y tú</Span>, además de con
          cualquiera del resto de usuarios que estén registrados en nuestra
          página.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY OÜ</Span> se guarda el derecho a
          cambiar los presentes{' '}
          <Span fontWeight="bold">Términos y Condiciones</Span> en cualquier
          momento. Dichos cambios serán siempre notificados a todos los usuarios
          vía correo electrónico, o a través de la propia página web o la
          aplicación, en el momento en el que el usuario entre e inicie sesión,
          siempre que dichos cambios influyan en la posible actividad del
          usuario en nuestra plataforma. En caso contrario,{' '}
          <Span fontWeight="bold">INOTHY OÜ</Span> no se ve obligado a notificar
          a los usuarios de cualquier cambio producido en la plataforma o en el
          servicio proporcionado por la empresa.
        </P>
        <Title>Definiciones</Title>
        <P>
          <Span fontWeight="bold">Servicios o Plataforma:</Span> Nosotros
          ofrecemos un servicio de intermediación en el intercambio de apuntes y
          material académico entre los Usuarios y Vendedores en el libre
          mercado.
        </P>
        <P>
          <Span fontWeight="bold">Contenidos:</Span> Estos están constituidos
          por los apuntes y/o material académico que suban y alojen los
          Vendedores en la Plataforma para venderlos a los Usuarios y que estos
          los puedan descargar y utilizar como apoyo académico.
        </P>
        <P>
          <Span fontWeight="bold">Vendedores:</Span> Son los usuarios que venden
          sus Contenidos en nuestra Plataforma. Estos pondrán el precio que
          ellos consideren a sus Contenidos, en función del valor que ellos
          mismos consideren que estos tienen, dentro de nuestros topes
          prestablecidos, y cualquier Usuario de la Plataforma será libre de
          pagarlos y adquirirlos.
        </P>
        <P>
          <Span fontWeight="bold">Usuarios:</Span> Son los Usuarios de nuestra
          Plataforma que compran libremente Contenidos subidos por los
          Vendedores al precio que cada contenido esté estipulado por el propio
          Vendedor.
        </P>
        <P>
          Se aclara que una persona o empresa registrada en nuestros Servicios,
          tiene la posibilidad de ser, simultáneamente,{' '}
          <Span fontWeight="bold">Usuario y Vendedor</Span>.
        </P>

        <Title>El uso de nuestros servicios</Title>
        <P>
          En virtud de las siguientes condiciones, como{' '}
          <Span fontWeight="bold">Usuario</Span>, obtienes una licencia de uso
          no exclusiva, limitada y no transferible para utilizar nuestros
          Servicios.
        </P>
        <P>
          Sugerimos que todo <Span fontWeight="bold">Usuario</Span> lea los{' '}
          <Span fontWeight="bold">Términos y Condiciones</Span>, así como la{' '}
          <Span fontWeight="bold">Política de Privacidad</Span>.
        </P>
        <P>
          Al aceptar estos términos y comenzar a usar nuestros{' '}
          <Span fontWeight="bold">Servicios</Span>, asumes y aceptas que
          trataremos determinados datos de carácter personal que nos hayas
          proporcionado en beneficio de la empresa.
        </P>
        <P>
          Si representas a una empresa, institución o persona jurídica,
          confirmas al aceptar las presentes condiciones que tienes la
          suficiente capacidad y derechos pertinentes para utilizar nuestros{' '}
          <Span fontWeight="bold">Servicios</Span> en nombre de dicha empresa,
          institución o persona jurídica.
        </P>

        <Title>Registro</Title>
        <P>
          El uso de nuestros <Span fontWeight="bold">Servicios</Span> está
          limitado para <Span fontWeight="bold">Usuarios</Span> registrados. El
          uso para los usuarios de internet que no se registren queda limitado.
          Por lo tanto, cada Usuario será responsable de mantener los mecanismos
          de seguridad secretos, como pueden ser el nombre de usuario y la
          contraseña. La contraseña de cada{' '}
          <Span fontWeight="bold">Usuario</Span> es personal e intransferible.
        </P>
        <P>
          En caso de{' '}
          <Span fontWeight="bold">solicitud de cambio de contraseña</Span>, el{' '}
          <Span fontWeight="bold">Usuario</Span> deberá seguir los pasos que se
          le sean indicados por la Plataforma para el restablecimiento de la
          misma.
        </P>
        <P>
          Se requiere un mínimo de <Span fontWeight="bold">18 años</Span> para
          poder utilizar nuestros <Span fontWeight="bold">Servicios</Span>.
        </P>
        <P>
          La introducción de tus datos de carácter personal en la{' '}
          <Span fontWeight="bold">Plataforma</Span>
          requerirá que se acepte la Política de Privacidad.
        </P>
        <P>
          Los <Span fontWeight="bold">Usuarios</Span> no tienen permitido{' '}
          <Span fontWeight="bold">acceder o piratear</Span>, sin la autorización
          de <Span fontWeight="bold">INOTHY</Span>, áreas de acceso restringido
          del <Span fontWeight="bold">Servicio</Span>, lo cual podría estar
          sujeto a{' '}
          <Span fontWeight="bold">responsabilidad civil y/o penal</Span>, así
          como con la utilización de cualquier sistema automatizado, o lectores
          fuera de los navegadores web convencionales.
        </P>
        <P>
          El <Span fontWeight="bold">Usuario</Span> es consciente de que queda
          prohibido utilizar los canales de comunicación de nuestros{' '}
          <Span fontWeight="bold">Servicios</Span> con cualquier fin que no esté
          relacionado con el intercambio de apuntes o material académico.
        </P>

        <Title>Limitaciones al uso de nuestros Servicios</Title>
        <P>
          La licencia otorgada por{' '}
          <Span fontWeight="bold">INOTHY al Usuario</Span> para el uso de
          nuestros Servicios contiene la expresa prohibición de las siguientes
          actividades:
        </P>
        <Ul>
          <li>
            <P>
              Subir y/o vender Contenidos de los que no se posean{' '}
              <Span fontWeight="bold">derechos de autor</Span>, es decir, que no
              hayan sido creados por ellos mismos o de los que no se disponga
              autorización del autor de los mismos para su distribución como fin
              lucrativo.
            </P>
          </li>
          <li>
            <P>
              Subir <Span fontWeight="bold">contenido falso</Span> a la{' '}
              <Span fontWeight="bold">Plataforma</Span>, es decir, que su
              contenido no se corresponda con lo estipulado por él mismo en el
              anuncio de venta del documento en la{' '}
              <Span fontWeight="bold">Plataforma</Span>. En ese caso, no se
              permitirá el retiro del saldo correspondiente a dichas ventas.
            </P>
          </li>
          <li>
            <P>
              Transmitir, retransmitir o distribuir{' '}
              <Span fontWeight="bold">
                {'"'}spam{'"'}
              </Span>{' '}
              o {'"'}
              mensajes en cadena{'"'}.
            </P>
          </li>
          <li>
            <P>
              Utilizar nuestro <Span fontWeight="bold">Servicio</Span> para
              enviar material amenazador, ilegal u obsceno.
            </P>
          </li>
          <li>
            <P>
              Utilizar nuestro <Span fontWeight="bold">Servicio</Span> para la
              realización de cualquier actividad ilegal.
            </P>
          </li>
          <li>
            <P>
              Utilizar la identidad de un tercero, esté o no registrado en
              nuestros <Span fontWeight="bold">Servicios</Span>.
            </P>
          </li>
          <li>
            <P>
              Enviar <Span fontWeight="bold">virus</Span> informáticos o
              similares.
            </P>
          </li>
        </Ul>
        <P>
          <Span fontWeight="bold">INOTHY</Span> advierte de que no puede{' '}
          <Span fontWeight="bold">verificar la edad</Span> de los{' '}
          <Span fontWeight="bold">Usuarios</Span> registrados, a pesar de
          solicitar revisiones del KYC (de las siglas en inglés “Know Your
          Costumer”), por lo que le es imposible localizar y verificar la
          existencia de aquellos que no cumplan la edad mínima requerida para el
          uso de nuestros <Span fontWeight="bold">Servicios</Span> de 18 años.
          Es por eso, que la <Span fontWeight="bold">Plataforma</Span> no se
          responsabilizará ni de las personas menores de 18 años ni de las
          personas incapacitadas que accedan a nuestro{' '}
          <Span fontWeight="bold">Servicio</Span>, siendo esta responsabilidad
          residente en sus representantes legales en cada caso. El{' '}
          <Span fontWeight="bold">Usuario</Span>, mediante el registro,
          manifiesta responsablemente y garantiza que tiene al menos 18 años y
          que está capacitado mentalmente para poder realizar el uso de nuestros{' '}
          <Span fontWeight="bold">Servicios</Span>.
        </P>

        <Title>Pagos a Usuarios</Title>
        <P>
          Al basarse la <Span fontWeight="bold">Plataforma</Span> en un{' '}
          <Span fontWeight="bold">mercado de precios libre con topes</Span>,
          cada <Span fontWeight="bold">Vendedor</Span> decide la cantidad
          económica que desea recibir por cada descarga en un{' '}
          <Span fontWeight="bold">Contenido</Span> concreto. El procedimiento de
          compra y de venta de los <Span fontWeight="bold">Contenidos</Span> en
          la <Span fontWeight="bold">Plataforma</Span> es el siguiente:
        </P>
        <Ul>
          <li>
            <P>
              El <Span fontWeight="bold">Usuario</Span> seleccionará los bienes
              que desea adquirir. Se le redireccionará al procedimiento de pago
              y pagará el importe del <Span fontWeight="bold">Contenido</Span> a
              la <Span fontWeight="bold">Plataforma</Span>, además del IVA
              correspondiente. Dicha compra aparecerá en el{' '}
              <Span fontWeight="bold">
                porcentaje correspondiente del importe después de comisiones de
                la plataforma de pagos
              </Span>
              , en el saldo del <Span fontWeight="bold">Vendedor</Span> (
              <Span fontWeight="bold">INOTHY</Span> se queda con el restante en
              concepto de comisión) y le será notificado de que ha recibido una
              compra y la información genérica de la misma.
            </P>
          </li>
          <li>
            <P>
              El <Span fontWeight="bold">Vendedor</Span>, podrá retirar su saldo
              en el momento que desee y desde ese momento se comenzará a
              tramitar su retiro de efectivo
            </P>
          </li>
        </Ul>
        <P>
          Todos los trámites de pagos son gestionados por{' '}
          <Span fontWeight="bold">Mangopay SA</Span>, y todos los aspectos
          legales en relación con la gestión y tramitación de los pagos se
          pueden consultar en sus{' '}
          <Span fontWeight="bold">términos y condiciones</Span>, los cuales
          facilitamos también, de la misma manera que los presentes, en nuestra{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          Todos los umbrales de precio pueden ser modificados en cualquier
          momento por parte de <Span fontWeight="bold">INOTHY</Span> sin previo
          aviso. Los usuarios pueden sugerir, a través de los correspondientes
          formularios, que haya cambios en dichos umbrales de precios topes.
        </P>
        <P>
          El saldo no podrá ser retirado en caso de que este mismo provenga de
          descargas no válidas.
        </P>
        <P>Los pagos se calcularán siempre bajo nuestra contabilidad.</P>
        <P>
          <Span fontWeight="bold">INOTHY</Span> puede solicitar a un{' '}
          <Span fontWeight="bold">Usuario</Span> que le reembolse, en un plazo
          de 21 días, la cantidad que le haya podido abonar de más por error.
        </P>
        <P>
          A menos que se especifique lo contrario, todos los pagos se realizarán
          en <Span fontWeight="bold">EUROS</Span>.
        </P>
        <P>
          Las formas de pago y de retiro disponibles se especificarán en los
          apartados correspondientes en los{' '}
          <Span fontWeight="bold">Servicios</Span>.
        </P>
        <P>
          Los <Span fontWeight="bold">Usuarios</Span> reconocen y están de
          acuerdo de que son responsables de la recaudación y/o pago de todos
          los impuestos a los que pueden estar sujetos, según la jurisdicción
          aplicable.
        </P>
        <P>
          En el caso de que, a la hora de realizar un recibo, el{' '}
          <Span fontWeight="bold">Usuario</Span> indicara una cuenta o una
          dirección errónea, <Span fontWeight="bold">INOTHY</Span> no se
          responsabiliza de que el <Span fontWeight="bold">Usuario</Span> acabe
          recibiendo o no dicho saldo.
        </P>

        <Title>Facturas</Title>
        <P>
          Debido a la naturaleza de la operación de venta de nuestra{' '}
          <Span fontWeight="bold">Plataforma</Span>,{' '}
          <Span fontWeight="bold">Inothy</Span> no remitirá factura al{' '}
          <Span fontWeight="bold">Usuario</Span> que use sus{' '}
          <Span fontWeight="bold">Servicios</Span>, a no ser que este así lo
          solicite vía correo electrónico, escribiendo a{' '}
          <Span color="secondary">contact@inothy.com</Span>. Esta factura sólo
          incluye los <Span fontWeight="bold">Servicios</Span> que son
          responsabilidad de <Span fontWeight="bold">Inothy</Span>, es decir,
          las comisiones. El importe correspondiente a la parte del{' '}
          <Span fontWeight="bold">Vendedor</Span> es responsabilidad del propio{' '}
          <Span fontWeight="bold">Vendedor</Span>, por lo que, si se desea
          obtener factura de esa parte del importe, se nos debe hacer saber a
          través de la misma dirección de correo electrónico, para así nosotros
          poder notificar al <Span fontWeight="bold">Vendedor</Span> de ello.
          Las facturas de la parte correspondiente a{' '}
          <Span fontWeight="bold">Inothy</Span>, a pesar de no remitirse al
          cliente en primera instancia, son creadas en la misma fecha en la que
          tiene lugar la operación mercantil en la{' '}
          <Span fontWeight="bold">Plataforma</Span> y almacenadas bajo la
          contabilidad de la <Span fontWeight="bold">Plataforma</Span>.
        </P>

        <Title>Licencia a favor de INOTHY</Title>
        <P>
          Los <Span fontWeight="bold">Usuarios</Span>, en general y los{' '}
          <Span fontWeight="bold">Vendedores</Span>, en particular, conceden a
          la <Span fontWeight="bold">Plataforma</Span> una licencia de uso,
          gratuita, transferible (con derecho de sub-licencia), de alcance
          mundial, durante toda la vigencia de los derechos de autor y de la
          propiedad intelectual sobre sus{' '}
          <Span fontWeight="bold">Contenidos</Span>, con el objeto de que{' '}
          <Span fontWeight="bold">INOTHY</Span> pueda utilizar, reproducir,
          distribuir, realizar obras derivadas de, mostrar y ejecutar ese{' '}
          <Span fontWeight="bold">Contenido</Span> en relación con la prestación
          de los <Span fontWeight="bold">Servicios</Span> y con el
          funcionamiento de los <Span fontWeight="bold">Servicios</Span> y de la
          actividad de <Span fontWeight="bold">INOTHY</Span>, incluyendo sin
          limitación alguna, a efectos de promoción y redistribución de los
          Servicios en cualquier formato y a través de cualquier canal de
          comunicación; pueda utilizar y explotar económicamente los{' '}
          <Span fontWeight="bold">Contenidos</Span> en cualquier forma y
          modalidad de uso, dentro e incluso fuera de la{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          Todos los <Span fontWeight="bold">Contenidos</Span> subidos a la{' '}
          <Span fontWeight="bold">Plataforma</Span>, por lo tanto, pasan también
          a ser propiedad de <Span fontWeight="bold">INOTHY</Span> y esta
          licencia perdurará de manera indefinida, incluso aun habiendo sido
          borrado dicho <Span fontWeight="bold">Contenido</Span> por parte del{' '}
          <Span fontWeight="bold">Usuario o Vendedor</Span> del cual es la
          autoría del propio.
        </P>
        <P>
          Todo ello sin perjuicio de la remuneración que en su caso tenga
          derecho el <Span fontWeight="bold">Vendedor</Span> de conformidad con
          la Plataforma. Con respecto a cualquier contraprestación económica,{' '}
          <Span fontWeight="bold">INOTHY</Span> aplicará las retenciones e
          impuestos aplicables que correspondan. El{' '}
          <Span fontWeight="bold">Vendedor</Span> receptor de cualquier pago se
          compromete igualmente a satisfacer los impuestos correspondientes por
          los ingresos que reciba por sus ventas en la{' '}
          <Span fontWeight="bold">Plataforma</Span>. Esta última premisa no
          será, en ningún caso, responsabilidad de la{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          A su vez, el <Span fontWeight="bold">Vendedor</Span> proporciona a
          favor de cualquier <Span fontWeight="bold">Usuario</Span> que compre
          sus <Span fontWeight="bold">Contenidos</Span> una licencia mundial, no
          exclusiva y exenta de royalties para acceder a su{' '}
          <Span fontWeight="bold">Contenido</Span> a través de la{' '}
          <Span fontWeight="bold">Plataforma</Span> y poder descargarlo para su
          uso personal.
        </P>
        <P>
          Las anteriores licencias otorgadas por los{' '}
          <Span fontWeight="bold">Vendedores</Span> con respecto a sus{' '}
          <Span fontWeight="bold">Contenidos</Span> nunca quedarán canceladas,
          ni aun borrando dicho <Span fontWeight="bold">Contenido</Span> de la{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          Queda totalmente prohibida la distribución de unos{' '}
          <Span fontWeight="bold">Servicios</Span> adquiridos en la{' '}
          <Span fontWeight="bold">Plataforma</Span> fuera de la misma.
        </P>

        <Title>Nuestas responsabilidades</Title>
        <P>
          <Span fontWeight="bold">INOTHY</Span> es un prestador de servicio de
          intermediación, y, como tal, no tiene la obligación de controlar,
          vigilar ni inspeccionar previamente los{' '}
          <Span fontWeight="bold">Contenidos</Span> que los{' '}
          <Span fontWeight="bold">Usuarios</Span> y Vendedores alojan o suben en
          sus <Span fontWeight="bold">Servicios</Span>.
        </P>
        <P>
          Por lo tanto, <Span fontWeight="bold">INOTHY</Span> no es responsable
          de los posibles actos ilícitos que los{' '}
          <Span fontWeight="bold">Usuarios y Vendedores</Span> cometan a la hora
          de utilizar los <Span fontWeight="bold">Servicios</Span>.
        </P>
        <P>
          Sin embargo, <Span fontWeight="bold">INOTHY</Span> se compromete a
          suspender o retirar aquellos <Span fontWeight="bold">Contenidos</Span>{' '}
          presunta o claramente ilícitos de los que tenga conocimiento efectivo
          una vez tales <Span fontWeight="bold">Contenidos</Span> han sido
          denunciados por algún{' '}
          <Span fontWeight="bold">Usuario o Vendedor</Span>.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY</Span> no puede garantizar a sus{' '}
          <Span fontWeight="bold">Usuarios</Span> que los{' '}
          <Span fontWeight="bold">Contenidos</Span> estén libres de errores,
          pero pone previsualizaciones a disposición de los mismos antes de
          comprarlos, así como un sistema de reportes en caso de que se haya
          comprado y exista algún error en el documento que haga que no se
          satisfagan las necesidades del <Span fontWeight="bold">Usuario</Span>.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY</Span> se reserva el derecho a
          modificar total o parcialmente algunas o todas las características de
          la <Span fontWeight="bold">Plataforma</Span>, siempre que se
          consideren necesarias, de las cuales, previamente, se notificará a los{' '}
          <Span fontWeight="bold">Usuarios</Span>, incluso por medios de correo
          electrónico, publicaciones en las redes sociales y notificaciones en
          la propia página web y aplicación.
        </P>
        <P>
          Debido a los riesgos inherentes al uso de internet,{' '}
          <Span fontWeight="bold">INOTHY</Span> no será responsable de ningún
          daño o virus que pueda afectar a los dispositivos de los{' '}
          <Span fontWeight="bold">Usuarios</Span> o a cualquier otra propiedad
          cuando se estén utilizando nuestros{' '}
          <Span fontWeight="bold">Servicios</Span>.
        </P>
        <P>
          Con el alcance máximo permitido por la legislación aplicable, los{' '}
          <Span fontWeight="bold">Usuarios</Span> se comprometen a mantener
          indemne a <Span fontWeight="bold">INOTHY</Span> o a cualquier empresa
          vinculada al <Span fontWeight="bold">Servicio</Span>, por las demandas
          y procedimientos legales que puedan surgir como consecuencia del uso
          de la <Span fontWeight="bold">Plataforma</Span> por parte de los{' '}
          <Span fontWeight="bold">Usuarios</Span> o de cualquier violación de
          estas <Span fontWeight="bold">Condiciones</Span> por parte de otros{' '}
          <Span fontWeight="bold">Usuarios</Span> o terceros.
        </P>

        <Title>Reporte de infracciones</Title>
        <P>
          <Span fontWeight="bold">INOTHY</Span> proporciona al Usuario una vía
          de contacto por correo electrónico, para notificaciones y consultas
          generales, y proporciona un formulario, a través de la{' '}
          <Span fontWeight="bold">Plataforma</Span>, mediante el cual el Usuario
          puede notificar/reportar cualquier error o copyright en relación con
          algún documento que esté alojado en la{' '}
          <Span fontWeight="bold">Plataforma</Span>.
        </P>

        <Title>Procedimiento a seguir por parte de INOTHY</Title>
        <P>
          Para ambos casos, una vez recibida la notificación de una posible
          infracción o error, <Span fontWeight="bold">INOTHY</Span> se
          compromete a examinar los <Span fontWeight="bold">Contenidos</Span>{' '}
          reportados en un plazo máximo de 30 días y a suspenderlos en caso de
          confirmarse el error o infracción.
        </P>
        <P>
          Todos los <Span fontWeight="bold">Usuarios</Span> registrados se
          comprometen a colaborar con la{' '}
          <Span fontWeight="bold">Plataforma</Span> y a proporcionar cualquier
          tipo de información relevante y/o necesaria para aclarar y resolver
          cualquiera de los conflictos que se han descrito.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY</Span> se reserva el derecho a
          suspender temporalmente o cancelar la cuenta, así como borrar un
          Contenido en concreto del <Span fontWeight="bold">Usuario</Span>{' '}
          responsable del <Span fontWeight="bold">Contenido</Span> que incumpla
          las{' '}
          <Span fontWeight="bold">
            Condiciones y las Políticas de Privacidad
          </Span>
          , o sea culpable de vulnerar los derechos de autor de terceros o de
          otros <Span fontWeight="bold">Usuarios</Span> también registrados en
          la <Span fontWeight="bold">Plataforma</Span>.
        </P>
        <P>
          En el caso de darse reportes falsos o abusivos,{' '}
          <Span fontWeight="bold">INOTHY</Span> se reserva el derecho de
          suspender la cuenta del <Span fontWeight="bold">Usuario</Span> que
          haya realizado dichos{' '}
          <Span fontWeight="bold">reportes falsos o abusivos</Span>. Se
          contempla también y se reserva el derecho de cancelación de la cuenta
          en caso de ser reincidente.
        </P>
        <P>
          Garantizamos la{' '}
          <Span fontWeight="bold">confidencialidad y el anonimato</Span> del
          informante del reporte.
        </P>

        <Title>Permanencia</Title>
        <P>
          Exceptuando el caso en el que <Span fontWeight="bold">INOTHY</Span>{' '}
          decida cancelar los <Span fontWeight="bold">Servicios</Span> o
          cancelar la cuenta de un <Span fontWeight="bold">Usuario</Span> en
          concreto, los <Span fontWeight="bold">Servicios</Span> proporcionados
          por <Span fontWeight="bold">INOTHY</Span> tienen una duración
          indeterminada de acuerdo con las siguientes{' '}
          <Span fontWeight="bold">Condiciones</Span>, a no ser que un usuario
          solicite a<Span fontWeight="bold">INOTHY</Span> explícitamente la
          eliminación de su <Span fontWeight="bold">Usuario</Span>.
        </P>

        <Title>Finalización</Title>
        <P>
          <Span fontWeight="bold">INOTHY</Span> está facultado para cancelar, o
          cesar los Servicios o la prestación de los mismos, en cualquier
          momento y a su discreción y por cualquier motivo. En cualquier caso,{' '}
          <Span fontWeight="bold">INOTHY</Span> notificaría a todos los{' '}
          <Span fontWeight="bold">Usuarios</Span> con la suficiente antelación y
          permitiría los retiros del 80% del saldo de manera extraordinaria.
        </P>
        <P>
          <Span fontWeight="bold">INOTHY</Span> se reserva el derecho a eliminar
          sin previo aviso, toda cuenta cuyo{' '}
          <Span fontWeight="bold">Usuario</Span> haya infringido las presentes{' '}
          <Span fontWeight="bold">
            Condiciones y/o la Política de Privacidad
          </Span>
          .
        </P>
        <P>
          Además, <Span fontWeight="bold">INOTHY</Span> también se reserva el
          derecho a eliminar, sin previo aviso, la cuenta de cualquier{' '}
          <Span fontWeight="bold">Usuario</Span> que lleve inactivo durante un
          período superior a 12 meses desde su última conexión.
        </P>

        <Title>Notificaciones</Title>
        <P>
          Cualquier notificación que se tenga que producir entre las partes se
          realizará por la correspondiente dirección de correo electrónico.
        </P>

        <Title>Convalidación</Title>
        <P>
          Si alguna de estas disposiciones legales de las{' '}
          <Span fontWeight="bold">Condiciones</Span> se considerase ilícita,
          inválida o inaplicable, por alguna razón, dicha disposición no se
          tomará en consideración y se separará de estos{' '}
          <Span fontWeight="bold">Términos y Condiciones</Span>, no afectando a
          la validez y aplicación de las restantes disposiciones.
        </P>
        <P>
          En caso de escisión, fusión, quiebra o adquisición de los{' '}
          <Span fontWeight="bold">Servicios de INOTHY</Span> por parte de
          terceros, <Span fontWeight="bold">INOTHY</Span> se reserva el derecho
          de transferir o asignar la información que haya recogido de los{' '}
          <Span fontWeight="bold">Usuarios</Span> como parte de dicha fusión,
          adquisición, venta u otro cambio de control.
        </P>
        <P>
          En el caso de quiebra o insolvencia, su información será procesada de
          conformidad con la aplicación de las reglas de insolvencia que afectan
          a los derechos de los acreedores en general y al desarrollo de los
          activos de la empresa en esa situación.
        </P>

        <Title>Ley y Jurisdicción aplicable</Title>
        <P>
          Este contrato tiene <Span fontWeight="bold">carácter mercantil</Span>,
          no existiendo, en ningún caso, ningún tipo de relación laboral,
          jurídica o de asociación entre <Span fontWeight="bold">INOTHY</Span> y
          los <Span fontWeight="bold">Usuarios del Servicio</Span>.
        </P>
        <P>
          Estas{' '}
          <Span fontWeight="bold">Condiciones y Política de Privacidad</Span>{' '}
          establecen el alcance total de nuestras obligaciones y
          responsabilidades en relación con los{' '}
          <Span fontWeight="bold">Servicios</Span> prestados por{' '}
          <Span fontWeight="bold">INOTHY</Span>, y sustituye cualquier acuerdo
          previo y común alcanzado entre nosotros y los{' '}
          <Span fontWeight="bold">Usuarios y Vendedores</Span>.
        </P>
        <P>
          La negativa de <Span fontWeight="bold">INOTHY</Span> a ejercer o hacer
          valer cualquier derecho o disposición de los{' '}
          <Span fontWeight="bold">Términos y Condiciones</Span> o de la{' '}
          <Span fontWeight="bold">Política de Privacidad</Span> no constituirá
          una renuncia a tales derechos o disposiciones.
        </P>
        <P>
          Las partes se someten para la resolución de sus conflictos y con
          renuncia a cualquier otro fuero, a los juzgados y tribunales que le
          correspondan a <Span fontWeight="bold">INOTHY</Span>.
        </P>
        <P>
          <Span fontWeight="bold">Todos los derechos reservados</Span>. Todos
          los derechos de autor, marcas comerciales y logotipos utilizados que
          formen parte o aparezcan en la{' '}
          <Span fontWeight="bold">Plataforma</Span>, son{' '}
          <Span fontWeight="bold">propiedad de INOTHY</Span> o propiedad de
          terceros. No se le permite a los Usuarios utilizarlos sin nuestro
          previo consentimiento por escrito o sin el consentimiento de dicho
          tercero.
        </P>
      </LegalDiv>
    </App>
  )
}
