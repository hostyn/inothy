import styled from 'styled-components'
import App from '../components/App'
import Span from '@ui/Span'
import Text from '@ui/Text'
import { sizes } from '../config/theme'

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

const Bold = styled(Span)`
  font-weight: bold;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0 0.5rem 0;
`

export default function LegalView () {
  return (
    <App>
      <LegalDiv>
        <Text fontSize="1.5rem" fontWeight="bold" margin="0 0 1rem 0">
          TÉRMINOS Y CONDICIONES
        </Text>
        <P>
          Bienvenido a <Bold>INOTHY</Bold> y muchas gracias por escoger nuestra
          plataforma. En cuanto aceptes los siguientes{' '}
          <Bold>términos y condiciones</Bold> que proponemos para el correcto
          uso de nuestra plataforma, pasarás a formar parte de nuestra
          comunidad.
        </P>
        <P>
          Es de vital importancia que los leas y comprendas todas las
          condiciones que se proponen en el contrato.
        </P>
        <P>
          <Bold>Inothy OÜ</Bold> es una sociedad limitada bajo las leyes de
          Estonia, con dirección en Harju maakond, Tallinn, Lasnamäe linnaosa,
          Lõõtsa tn 2a, 11415 y registrada bajo las autoridades de Estonia con
          número de registro 16579634, autorizada para llevar a cabo actividades
          comerciales en la red, tal y como realizamos en la presenta{' '}
          <Bold>Plataforma</Bold>.
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
          Estas <Bold>Condiciones de Uso</Bold> establecen las obligaciones, los
          derechos y las relaciones contractuales entre <Bold>INOTHY OÜ</Bold> y
          los <Bold>usuarios</Bold> que estén registrados en los servicios que
          ofrecemos. Es por eso, que, al registrarte, aceptas que las presentes
          condiciones, así como la <Bold>Política de Privacidad</Bold> y
          cualquier aviso legal que sea publicado desde la fecha de tu registro
          en adelante por parte de <Bold>INOTHY OÜ</Bold>. Estos constituirán el
          acuerdo completo entre <Bold>Inothy OÜ y tú</Bold>, además de con
          cualquiera del resto de usuarios que estén registrados en nuestra
          página.
        </P>
        <P>
          <Bold>INOTHY OÜ</Bold> se guarda el derecho a cambiar los presentes
          <Bold>Términos y Condiciones</Bold> en cualquier momento. Dichos
          cambios serán siempre notificados a todos los usuarios vía correo
          electrónico, o a través de la propia página web o la aplicación, en el
          momento en el que el usuario entre e inicie sesión, siempre que dichos
          cambios influyan en la posible actividad del usuario en nuestra
          plataforma. En caso contrario, <Bold>INOTHY OÜ</Bold> no se ve
          obligado a notificar a los usuarios de cualquier cambio producido en
          la plataforma o en el servicio proporcionado por la empresa.
        </P>
        <Title>Definiciones</Title>
        <P>
          <Bold>Servicios o Plataforma:</Bold> Nosotros ofrecemos un servicio de
          intermediación en el intercambio de apuntes y material académico entre
          los Usuarios y Vendedores en el libre mercado.
        </P>
        <P>
          <Bold>Contenidos:</Bold> Estos están constituidos por los apuntes y/o
          material académico que suban y alojen los Vendedores en la Plataforma
          para venderlos a los Usuarios y que estos los puedan descargar y
          utilizar como apoyo académico.
        </P>
        <P>
          <Bold>Vendedores:</Bold> Son los usuarios que venden sus Contenidos en
          nuestra Plataforma. Estos pondrán el precio que ellos consideren a sus
          Contenidos, en función del valor que ellos mismos consideren que estos
          tienen, dentro de nuestros topes prestablecidos, y cualquier Usuario
          de la Plataforma será libre de pagarlos y adquirirlos.
        </P>
        <P>
          <Bold>Usuarios:</Bold> Son los Usuarios de nuestra Plataforma que
          compran libremente Contenidos subidos por los Vendedores al precio que
          cada contenido esté estipulado por el propio Vendedor.
        </P>
        <P>
          Se aclara que una persona o empresa registrada en nuestros Servicios,
          tiene la posibilidad de ser, simultáneamente,{' '}
          <Bold>Usuario y Vendedor</Bold>.
        </P>

        <Title>El uso de nuestros servicios</Title>
        <P>
          En virtud de las siguientes condiciones, como <Bold>Usuario</Bold>,
          obtienes una licencia de uso no exclusiva, limitada y no transferible
          para utilizar nuestros Servicios.
        </P>
        <P>
          Sugerimos que todo <Bold>Usuario</Bold> lea los{' '}
          <Bold>Términos y Condiciones</Bold>, así como la{' '}
          <Bold>Política de Privacidad</Bold>.
        </P>
        <P>
          Al aceptar estos términos y comenzar a usar nuestros{' '}
          <Bold>Servicios</Bold>, asumes y aceptas que trataremos determinados
          datos de carácter personal que nos hayas proporcionado en beneficio de
          la empresa.
        </P>
        <P>
          Si representas a una empresa, institución o persona jurídica,
          confirmas al aceptar las presentes condiciones que tienes la
          suficiente capacidad y derechos pertinentes para utilizar nuestros{' '}
          <Bold>Servicios</Bold> en nombre de dicha empresa, institución o
          persona jurídica.
        </P>

        <Title>Registro</Title>
        <P>
          El uso de nuestros <Bold>Servicios</Bold> está limitado para{' '}
          <Bold>Usuarios</Bold> registrados. El uso para los usuarios de
          internet que no se registren queda limitado. Por lo tanto, cada
          Usuario será responsable de mantener los mecanismos de seguridad
          secretos, como pueden ser el nombre de usuario y la contraseña. La
          contraseña de cada <Bold>Usuario</Bold> es personal e intransferible.
        </P>
        <P>
          En caso de <Bold>solicitud de cambio de contraseña</Bold>, el{' '}
          <Bold>Usuario</Bold> deberá seguir los pasos que se le sean indicados
          por la Plataforma para el restablecimiento de la misma.
        </P>
        <P>
          Se requiere un mínimo de <Bold>18 años</Bold> para poder utilizar
          nuestros <Bold>Servicios</Bold>.
        </P>
        <P>
          La introducción de tus datos de carácter personal en la{' '}
          <Bold>Plataforma</Bold>
          requerirá que se acepte la Política de Privacidad.
        </P>
        <P>
          Los <Bold>Usuarios</Bold> no tienen permitido{' '}
          <Bold>acceder o piratear</Bold>, sin la autorización de{' '}
          <Bold>INOTHY</Bold>, áreas de acceso restringido del{' '}
          <Bold>Servicio</Bold>, lo cual podría estar sujeto a{' '}
          <Bold>responsabilidad civil y/o penal</Bold>, así como con la
          utilización de cualquier sistema automatizado, o lectores fuera de los
          navegadores web convencionales.
        </P>
        <P>
          El <Bold>Usuario</Bold> es consciente de que queda prohibido utilizar
          los canales de comunicación de nuestros <Bold>Servicios</Bold> con
          cualquier fin que no esté relacionado con el intercambio de apuntes o
          material académico.
        </P>

        <Title>Limitaciones al uso de nuestros Servicios</Title>
        <P>
          La licencia otorgada por <Bold>INOTHY al Usuario</Bold> para el uso de
          nuestros Servicios contiene la expresa prohibición de las siguientes
          actividades:
        </P>
        <Ul>
          <li>
            <P>
              Subir y/o vender Contenidos de los que no se posean{' '}
              <Bold>derechos de autor</Bold>, es decir, que no hayan sido
              creados por ellos mismos o de los que no se disponga autorización
              del autor de los mismos para su distribución como fin lucrativo.
            </P>
          </li>
          <li>
            <P>
              Subir <Bold>contenido falso</Bold> a la <Bold>Plataforma</Bold>,
              es decir, que su contenido no se corresponda con lo estipulado por
              él mismo en el anuncio de venta del documento en la{' '}
              <Bold>Plataforma</Bold>. En ese caso, no se permitirá el retiro
              del saldo correspondiente a dichas ventas.
            </P>
          </li>
          <li>
            <P>
              Transmitir, retransmitir o distribuir{' '}
              <Bold>
                {'"'}spam{'"'}
              </Bold>{' '}
              o {'"'}
              mensajes en cadena{'"'}.
            </P>
          </li>
          <li>
            <P>
              Utilizar nuestro <Bold>Servicio</Bold> para enviar material
              amenazador, ilegal u obsceno.
            </P>
          </li>
          <li>
            <P>
              Utilizar nuestro <Bold>Servicio</Bold> para la realización de
              cualquier actividad ilegal.
            </P>
          </li>
          <li>
            <P>
              Utilizar la identidad de un tercero, esté o no registrado en
              nuestros <Bold>Servicios</Bold>.
            </P>
          </li>
          <li>
            <P>
              Enviar <Bold>virus</Bold> informáticos o similares.
            </P>
          </li>
        </Ul>
        <P>
          <Bold>INOTHY</Bold> advierte de que no puede{' '}
          <Bold>verificar la edad</Bold> de los <Bold>Usuarios</Bold>{' '}
          registrados, a pesar de solicitar revisiones del KYC (de las siglas en
          inglés “Know Your Costumer”), por lo que le es imposible localizar y
          verificar la existencia de aquellos que no cumplan la edad mínima
          requerida para el uso de nuestros <Bold>Servicios</Bold> de 18 años.
          Es por eso, que la <Bold>Plataforma</Bold> no se responsabilizará ni
          de las personas menores de 18 años ni de las personas incapacitadas
          que accedan a nuestro <Bold>Servicio</Bold>, siendo esta
          responsabilidad residente en sus representantes legales en cada caso.
          El <Bold>Usuario</Bold>, mediante el registro, manifiesta
          responsablemente y garantiza que tiene al menos 18 años y que está
          capacitado mentalmente para poder realizar el uso de nuestros{' '}
          <Bold>Servicios</Bold>.
        </P>

        <Title>Pagos a Usuarios</Title>
        <P>
          Al basarse la <Bold>Plataforma</Bold> en un{' '}
          <Bold>mercado de precios libre con topes</Bold>, cada{' '}
          <Bold>Vendedor</Bold> decide la cantidad económica que desea recibir
          por cada descarga en un <Bold>Contenido</Bold> concreto. El
          procedimiento de compra y de venta de los <Bold>Contenidos</Bold> en
          la <Bold>Plataforma</Bold> es el siguiente:
        </P>
        <Ul>
          <li>
            <P>
              El <Bold>Usuario</Bold> seleccionará los bienes que desea
              adquirir. Se le redireccionará al procedimiento de pago y pagará
              el importe del <Bold>Contenido</Bold> a la <Bold>Plataforma</Bold>
              , además del IVA correspondiente. Dicha compra aparecerá en el{' '}
              <Bold>
                porcentaje correspondiente del importe después de comisiones de
                la plataforma de pagos
              </Bold>
              , en el saldo del <Bold>Vendedor</Bold> (<Bold>INOTHY</Bold> se
              queda con el restante en concepto de comisión) y le será
              notificado de que ha recibido una compra y la información genérica
              de la misma.
            </P>
          </li>
          <li>
            <P>
              El <Bold>Vendedor</Bold>, podrá retirar su saldo en el momento que
              desee y desde ese momento se comenzará a tramitar su retiro de
              efectivo
            </P>
          </li>
        </Ul>
        <P>
          Todos los trámites de pagos son gestionados por{' '}
          <Bold>Mangopay SA</Bold>, y todos los aspectos legales en relación con
          la gestión y tramitación de los pagos se pueden consultar en sus{' '}
          <Bold>términos y condiciones</Bold>, los cuales facilitamos también,
          de la misma manera que los presentes, en nuestra{' '}
          <Bold>Plataforma</Bold>.
        </P>
        <P>
          Todos los umbrales de precio pueden ser modificados en cualquier
          momento por parte de <Bold>INOTHY</Bold> sin previo aviso. Los
          usuarios pueden sugerir, a través de los correspondientes formularios,
          que haya cambios en dichos umbrales de precios topes.
        </P>
        <P>
          El saldo no podrá ser retirado en caso de que este mismo provenga de
          descargas no válidas.
        </P>
        <P>Los pagos se calcularán siempre bajo nuestra contabilidad.</P>
        <P>
          <Bold>INOTHY</Bold> puede solicitar a un <Bold>Usuario</Bold> que le
          reembolse, en un plazo de 21 días, la cantidad que le haya podido
          abonar de más por error.
        </P>
        <P>
          A menos que se especifique lo contrario, todos los pagos se realizarán
          en <Bold>EUROS</Bold>.
        </P>
        <P>
          Las formas de pago y de retiro disponibles se especificarán en los
          apartados correspondientes en los <Bold>Servicios</Bold>.
        </P>
        <P>
          Los <Bold>Usuarios</Bold> reconocen y están de acuerdo de que son
          responsables de la recaudación y/o pago de todos los impuestos a los
          que pueden estar sujetos, según la jurisdicción aplicable.
        </P>
        <P>
          En el caso de que, a la hora de realizar un recibo, el{' '}
          <Bold>Usuario</Bold> indicara una cuenta o una dirección errónea,{' '}
          <Bold>INOTHY</Bold> no se responsabiliza de que el{' '}
          <Bold>Usuario</Bold> acabe recibiendo o no dicho saldo.
        </P>

        <Title>Facturas</Title>
        <P>
          Debido a la naturaleza de la operación de venta de nuestra{' '}
          <Bold>Plataforma</Bold>,<Bold>Inothy</Bold> no remitirá factura al{' '}
          <Bold>Usuario</Bold> que use sus <Bold>Servicios</Bold>, a no ser que
          este así lo solicite vía correo electrónico, escribiendo a{' '}
          <Span color="secondary">contact@inothy.com</Span>. Esta factura sólo
          incluye los <Bold>Servicios</Bold> que son responsabilidad de{' '}
          <Bold>Inothy</Bold>, es decir, las comisiones. El importe
          correspondiente a la parte del <Bold>Vendedor</Bold> es
          responsabilidad del propio <Bold>Vendedor</Bold>, por lo que, si se
          desea obtener factura de esa parte del importe, se nos debe hacer
          saber a través de la misma dirección de correo electrónico, para así
          nosotros poder notificar al <Bold>Vendedor</Bold> de ello. Las
          facturas de la parte correspondiente a <Bold>Inothy</Bold>, a pesar de
          no remitirse al cliente en primera instancia, son creadas en la misma
          fecha en la que tiene lugar la operación mercantil en la{' '}
          <Bold>Plataforma</Bold> y almacenadas bajo la contabilidad de la{' '}
          <Bold>Plataforma</Bold>.
        </P>

        <Title>Licencia a favor de INOTHY</Title>
        <P>
          Los <Bold>Usuarios</Bold>, en general y los <Bold>Vendedores</Bold>,
          en particular, conceden a la <Bold>Plataforma</Bold> una licencia de
          uso, gratuita, transferible (con derecho de sub-licencia), de alcance
          mundial, durante toda la vigencia de los derechos de autor y de la
          propiedad intelectual sobre sus <Bold>Contenidos</Bold>, con el objeto
          de que <Bold>INOTHY</Bold> pueda utilizar, reproducir, distribuir,
          realizar obras derivadas de, mostrar y ejecutar ese{' '}
          <Bold>Contenido</Bold> en relación con la prestación de los{' '}
          <Bold>Servicios</Bold> y con el funcionamiento de los{' '}
          <Bold>Servicios</Bold> y de la actividad de <Bold>INOTHY</Bold>,
          incluyendo sin limitación alguna, a efectos de promoción y
          redistribución de los Servicios en cualquier formato y a través de
          cualquier canal de comunicación; pueda utilizar y explotar
          económicamente los <Bold>Contenidos</Bold> en cualquier forma y
          modalidad de uso, dentro e incluso fuera de la <Bold>Plataforma</Bold>
          .
        </P>
        <P>
          Todos los <Bold>Contenidos</Bold> subidos a la <Bold>Plataforma</Bold>
          , por lo tanto, pasan también a ser propiedad de <Bold>INOTHY</Bold> y
          esta licencia perdurará de manera indefinida, incluso aun habiendo
          sido borrado dicho <Bold>Contenido</Bold> por parte del{' '}
          <Bold>Usuario o Vendedor</Bold> del cual es la autoría del propio.
        </P>
        <P>
          Todo ello sin perjuicio de la remuneración que en su caso tenga
          derecho el <Bold>Vendedor</Bold> de conformidad con la Plataforma. Con
          respecto a cualquier contraprestación económica, <Bold>INOTHY</Bold>{' '}
          aplicará las retenciones e impuestos aplicables que correspondan. El{' '}
          <Bold>Vendedor</Bold> receptor de cualquier pago se compromete
          igualmente a satisfacer los impuestos correspondientes por los
          ingresos que reciba por sus ventas en la
          <Bold>Plataforma</Bold>. Esta última premisa no será, en ningún caso,
          responsabilidad de la <Bold>Plataforma</Bold>.
        </P>
        <P>
          A su vez, el <Bold>Vendedor</Bold> proporciona a favor de cualquier{' '}
          <Bold>Usuario</Bold> que compre sus <Bold>Contenidos</Bold> una
          licencia mundial, no exclusiva y exenta de royalties para acceder a su{' '}
          <Bold>Contenido</Bold> a través de la <Bold>Plataforma</Bold> y poder
          descargarlo para su uso personal.
        </P>
        <P>
          Las anteriores licencias otorgadas por los <Bold>Vendedores</Bold> con
          respecto a sus <Bold>Contenidos</Bold> nunca quedarán canceladas, ni
          aun borrando dicho <Bold>Contenido</Bold> de la{' '}
          <Bold>Plataforma</Bold>.
        </P>
        <P>
          Queda totalmente prohibida la distribución de unos{' '}
          <Bold>Servicios</Bold> adquiridos en la <Bold>Plataforma</Bold> fuera
          de la misma.
        </P>

        <Title>Nuestas responsabilidades</Title>
        <P>
          <Bold>INOTHY</Bold> es un prestador de servicio de intermediación, y,
          como tal, no tiene la obligación de controlar, vigilar ni inspeccionar
          previamente los <Bold>Contenidos</Bold> que los <Bold>Usuarios</Bold>{' '}
          y Vendedores alojan o suben en sus <Bold>Servicios</Bold>.
        </P>
        <P>
          Por lo tanto, <Bold>INOTHY</Bold> no es responsable de los posibles
          actos ilícitos que los <Bold>Usuarios y Vendedores</Bold> cometan a la
          hora de utilizar los <Bold>Servicios</Bold>.
        </P>
        <P>
          Sin embargo, <Bold>INOTHY</Bold> se compromete a suspender o retirar
          aquellos <Bold>Contenidos</Bold> presunta o claramente ilícitos de los
          que tenga conocimiento efectivo una vez tales <Bold>Contenidos</Bold>{' '}
          han sido denunciados por algún <Bold>Usuario o Vendedor</Bold>.
        </P>
        <P>
          <Bold>INOTHY</Bold> no puede garantizar a sus <Bold>Usuarios</Bold>{' '}
          que los <Bold>Contenidos</Bold> estén libres de errores, pero pone
          previsualizaciones a disposición de los mismos antes de comprarlos,
          así como un sistema de reportes en caso de que se haya comprado y
          exista algún error en el documento que haga que no se satisfagan las
          necesidades del <Bold>Usuario</Bold>.
        </P>
        <P>
          <Bold>INOTHY</Bold> se reserva el derecho a modificar total o
          parcialmente algunas o todas las características de la{' '}
          <Bold>Plataforma</Bold>, siempre que se consideren necesarias, de las
          cuales, previamente, se notificará a los
          <Bold>Usuarios</Bold>, incluso por medios de correo electrónico,
          publicaciones en las redes sociales y notificaciones en la propia
          página web y aplicación.
        </P>
        <P>
          Debido a los riesgos inherentes al uso de internet,{' '}
          <Bold>INOTHY</Bold> no será responsable de ningún daño o virus que
          pueda afectar a los dispositivos de los <Bold>Usuarios</Bold> o a
          cualquier otra propiedad cuando se estén utilizando nuestros{' '}
          <Bold>Servicios</Bold>.
        </P>
        <P>
          Con el alcance máximo permitido por la legislación aplicable, los{' '}
          <Bold>Usuarios</Bold> se comprometen a mantener indemne a{' '}
          <Bold>INOTHY</Bold> o a cualquier empresa vinculada al{' '}
          <Bold>Servicio</Bold>, por las demandas y procedimientos legales que
          puedan surgir como consecuencia del uso de la <Bold>Plataforma</Bold>{' '}
          por parte de los <Bold>Usuarios</Bold> o de cualquier violación de
          estas <Bold>Condiciones</Bold> por parte de otros{' '}
          <Bold>Usuarios</Bold> o terceros.
        </P>

        <Title>Reporte de infracciones</Title>
        <P>
          <Bold>INOTHY</Bold> proporciona al Usuario una vía de contacto por
          correo electrónico, para notificaciones y consultas generales, y
          proporciona un formulario, a través de la <Bold>Plataforma</Bold>,
          mediante el cual el Usuario puede notificar/reportar cualquier error o
          copyright en relación con algún documento que esté alojado en la{' '}
          <Bold>Plataforma</Bold>.
        </P>

        <Title>Procedimiento a seguir por parte de INOTHY</Title>
        <P>
          Para ambos casos, una vez recibida la notificación de una posible
          infracción o error, <Bold>INOTHY</Bold> se compromete a examinar los{' '}
          <Bold>Contenidos</Bold> reportados en un plazo máximo de 30 días y a
          suspenderlos en caso de confirmarse el error o infracción.
        </P>
        <P>
          Todos los <Bold>Usuarios</Bold> registrados se comprometen a colaborar
          con la <Bold>Plataforma</Bold> y a proporcionar cualquier tipo de
          información relevante y/o necesaria para aclarar y resolver cualquiera
          de los conflictos que se han descrito.
        </P>
        <P>
          <Bold>INOTHY</Bold> se reserva el derecho a suspender temporalmente o
          cancelar la cuenta, así como borrar un Contenido en concreto del{' '}
          <Bold>Usuario</Bold> responsable del <Bold>Contenido</Bold> que
          incumpla las <Bold>Condiciones y las Políticas de Privacidad</Bold>, o
          sea culpable de vulnerar los derechos de autor de terceros o de otros{' '}
          <Bold>Usuarios</Bold> también registrados en la{' '}
          <Bold>Plataforma</Bold>.
        </P>
        <P>
          En el caso de darse reportes falsos o abusivos, <Bold>INOTHY</Bold> se
          reserva el derecho de suspender la cuenta del <Bold>Usuario</Bold> que
          haya realizado dichos <Bold>reportes falsos o abusivos</Bold>. Se
          contempla también y se reserva el derecho de cancelación de la cuenta
          en caso de ser reincidente.
        </P>
        <P>
          Garantizamos la <Bold>confidencialidad y el anonimato</Bold> del
          informante del reporte.
        </P>

        <Title>Permanencia</Title>
        <P>
          Exceptuando el caso en el que <Bold>INOTHY</Bold> decida cancelar los{' '}
          <Bold>Servicios</Bold> o cancelar la cuenta de un <Bold>Usuario</Bold>{' '}
          en concreto, los <Bold>Servicios</Bold> proporcionados por{' '}
          <Bold>INOTHY</Bold> tienen una duración indeterminada de acuerdo con
          las siguientes <Bold>Condiciones</Bold>, a no ser que un usuario
          solicite a<Bold>INOTHY</Bold> explícitamente la eliminación de su{' '}
          <Bold>Usuario</Bold>.
        </P>

        <Title>Finalización</Title>
        <P>
          <Bold>INOTHY</Bold> está facultado para cancelar, o cesar los
          Servicios o la prestación de los mismos, en cualquier momento y a su
          discreción y por cualquier motivo. En cualquier caso,{' '}
          <Bold>INOTHY</Bold> notificaría a todos los <Bold>Usuarios</Bold> con
          la suficiente antelación y permitiría los retiros del 80% del saldo de
          manera extraordinaria.
        </P>
        <P>
          <Bold>INOTHY</Bold> se reserva el derecho a eliminar sin previo aviso,
          toda cuenta cuyo <Bold>Usuario</Bold> haya infringido las presentes{' '}
          <Bold>Condiciones y/o la Política de Privacidad</Bold>.
        </P>
        <P>
          Además, <Bold>INOTHY</Bold> también se reserva el derecho a eliminar,
          sin previo aviso, la cuenta de cualquier <Bold>Usuario</Bold> que
          lleve inactivo durante un período superior a 12 meses desde su última
          conexión.
        </P>

        <Title>Notificaciones</Title>
        <P>
          Cualquier notificación que se tenga que producir entre las partes se
          realizará por la correspondiente dirección de correo electrónico.
        </P>

        <Title>Convalidación</Title>
        <P>
          Si alguna de estas disposiciones legales de las{' '}
          <Bold>Condiciones</Bold> se considerase ilícita, inválida o
          inaplicable, por alguna razón, dicha disposición no se tomará en
          consideración y se separará de estos{' '}
          <Bold>Términos y Condiciones</Bold>, no afectando a la validez y
          aplicación de las restantes disposiciones.
        </P>
        <P>
          En caso de escisión, fusión, quiebra o adquisición de los{' '}
          <Bold>Servicios de INOTHY</Bold> por parte de terceros,{' '}
          <Bold>INOTHY</Bold> se reserva el derecho de transferir o asignar la
          información que haya recogido de los <Bold>Usuarios</Bold> como parte
          de dicha fusión, adquisición, venta u otro cambio de control.
        </P>
        <P>
          En el caso de quiebra o insolvencia, su información será procesada de
          conformidad con la aplicación de las reglas de insolvencia que afectan
          a los derechos de los acreedores en general y al desarrollo de los
          activos de la empresa en esa situación.
        </P>

        <Title>Ley y Jurisdicción aplicable</Title>
        <P>
          Este contrato tiene <Bold>carácter mercantil</Bold>, no existiendo, en
          ningún caso, ningún tipo de relación laboral, jurídica o de asociación
          entre <Bold>INOTHY</Bold> y los <Bold>Usuarios del Servicio</Bold>.
        </P>
        <P>
          Estas <Bold>Condiciones y Política de Privacidad</Bold> establecen el
          alcance total de nuestras obligaciones y responsabilidades en relación
          con los <Bold>Servicios</Bold> prestados por <Bold>INOTHY</Bold>, y
          sustituye cualquier acuerdo previo y común alcanzado entre nosotros y
          los <Bold>Usuarios y Vendedores</Bold>.
        </P>
        <P>
          La negativa de <Bold>INOTHY</Bold> a ejercer o hacer valer cualquier
          derecho o disposición de los <Bold>Términos y Condiciones</Bold> o de
          la <Bold>Política de Privacidad</Bold> no constituirá una renuncia a
          tales derechos o disposiciones.
        </P>
        <P>
          Las partes se someten para la resolución de sus conflictos y con
          renuncia a cualquier otro fuero, a los juzgados y tribunales que le
          correspondan a <Bold>INOTHY</Bold>.
        </P>
        <P>
          <Bold>Todos los derechos reservados</Bold>. Todos los derechos de
          autor, marcas comerciales y logotipos utilizados que formen parte o
          aparezcan en la <Bold>Plataforma</Bold>, son{' '}
          <Bold>propiedad de INOTHY</Bold> o propiedad de terceros. No se le
          permite a los Usuarios utilizarlos sin nuestro previo consentimiento
          por escrito o sin el consentimiento de dicho tercero.
        </P>
      </LegalDiv>
    </App>
  )
}
