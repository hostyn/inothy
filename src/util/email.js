const nodemailer = require("nodemailer");

const transpoerter = nodemailer.createTransport({
  host: "smtp.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOREPLY_USER,
    pass: process.env.NOREPLY_PASS,
  },
});

export async function sendVerificationEmail(email, url) {
  const message = {
    from: "Inothy <noreply@inothy.com>",
    to: email,
    subject: "Verifica tu correo electrónico",
    text: `Para verificar tu correo electrónico, haz click en el siguiente enlace: ${url}`,
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title></title>
        <style>
          table {
            border-collapse: separate;
          }
    
          a,
          a:link,
          a:visited {
            text-decoration: none;
            color: #00788a;
          }
    
          a:hover {
            text-decoration: underline;
          }
    
          h2,
          h2 a,
          h2 a:visited,
          h3,
          h3 a,
          h3 a:visited,
          h4,
          h5,
          h6,
          .t_cht {
            color: #000 !important;
          }
    
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td {
            line-height: 100%;
          }
    
          .ExternalClass {
            width: 100%;
          }
        </style>
      </head>
      <body style="background-color: #fff; margin: 0">
        <table style="min-width: 100%; margin: 40px 0; text-align: center">
          <tr>
            <td>
              <img
                src="https://inothy.com/email/logo.png"
                style="height: 150px; min-height: 150px"
                alt="logo inothy"
                title="logo inothy"
                width="150px"
                height="150px"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://inothy.com/email/welcome.png"
                style="height: 50px; min-height: 50px"
                alt="Bienvenido"
                title="Bienvenido"
                width="350px"
                height="50px"
              />
            </td>
          </tr>
    
          <tr>
            <td>
              <p
                style="
                  font-family: Arial;
                  font-size: 20px;
                  color: #163d6b;
                  max-width: 500px;
                  width: 500px;
                  margin: 20px auto;
                "
              >
                Bienvenido a Inothy, donde puedes compartir tus apuntes, 
                monetizarlos o bien encontrar material de calidad para 
                ayudarte a aprobar.
              </p>
              <p
                style="
                  font-family: Arial;
                  font-size: 20px;
                  color: #163d6b;
                  max-width: 500px;
                  width: 500px;
                  margin: 20px auto;
                "
              >
                Verifica tu correo para empezar a utilizar la plataforma.
              </p>
            </td>
          </tr>
    
          <tr style="height: 50px; min-height: 50px">
            <td>
              <a
                href="${url}"
                target="_blank"
                style="
                  font-family: Arial;
                  background-color: #ea0029;
                  color: white;
                  padding: 10px 15px;
                  font-size: 20px;
                  border-radius: 10px;
                  text-decoration: none;
                "
                >Confirmar email</a
              >
            </td>
          </tr>
    
          <tr>
            <td>
              <p
                style="
                  font-family: Arial;
                  color: #163d6b;
                  font-weight: bold;
                  font-size: 30px;
                "
              >
                Contáctanos
              </p>
            </td>
          </tr>
    
          <tr style="text-align: center">
            <td>
              <a href="https://www.instagram.com/_inothy/" target="_blank">
                <img
                  src="https://inothy.com/email/instagram.png"
                  style="height: 50px; min-height: 50px; margin: 0 10px"
                  alt="instagram"
                  title="instagram"
                  width="50px"
                  height="50px"
                />
              </a>
              <a href="https://twitter.com/_inothy" target="_blank">
                <img
                  src="https://inothy.com/email/twitter.png"
                  style="height: 50px; min-height: 50px; margin: 0 10px"
                  alt="twitter"
                  title="twitter"
                  width="50px"
                  height="50px"
                />
              </a>
            </td>
          </tr>
    
          <tr style="height: 150px; min-height: 150px">
            <td>
              <a href="https://inothy.com" target="_blank">
                <img
                  src="https://inothy.com/email/isologo.png"
                  style="height: 70px; min-height: 70px"
                  alt="logo inothy"
                  title="logo inothy"
                  width="225px"
                  height="70"
                />
              </a>
            </td>
          </tr>
        </table>
      </body>
    </html>
    
    `,
  };

  try {
    return transpoerter.sendMail(message);
  } catch (error) {
    throw new Error("Email not sent");
  }
}

export async function sendPasswordResetEmail(email, url) {
  const message = {
    from: "Inothy <noreply@inothy.com>",
    to: email,
    subject: "Restablece tu contraseña",
    text: `Para restablecer tu contraseña, haz click en el siguiente enlace: ${url}`,
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title></title>
        <style>
          table {
            border-collapse: separate;
          }
    
          a,
          a:link,
          a:visited {
            text-decoration: none;
            color: #00788a;
          }
    
          a:hover {
            text-decoration: underline;
          }
    
          h2,
          h2 a,
          h2 a:visited,
          h3,
          h3 a,
          h3 a:visited,
          h4,
          h5,
          h6,
          .t_cht {
            color: #000 !important;
          }
    
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td {
            line-height: 100%;
          }
    
          .ExternalClass {
            width: 100%;
          }
        </style>
      </head>
      <body style="background-color: #fff; margin: 0">
        <table style="min-width: 100%; margin: 40px 0; text-align: center">
          <tr>
            <td>
              <img
                src="https://inothy.com/email/logo.png"
                style="height: 150px; min-height: 150px"
                alt="logo inothy"
                title="logo inothy"
                width="150px"
                height="150px"
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                src="https://inothy.com/email/welcome.png"
                style="height: 50px; min-height: 50px"
                alt="Bienvenido"
                title="Bienvenido"
                width="350px"
                height="50px"
              />
            </td>
          </tr>
    
          <tr>
            <td>
              <p
                style="
                  font-family: Arial;
                  font-size: 25px;
                  color: #ea0029;
                  max-width: 500px;
                  width: 500px;
                  margin: 20px auto;
                "
              >
                ¿Has olvidado tu contraseña?
              </p>
              <p
                style="
                  font-family: Arial;
                  font-size: 20px;
                  color: #163d6b;
                  max-width: 500px;
                  width: 500px;
                  margin: 20px auto;
                "
              >
                Pulsa en el siguiente botón para cambiar tu contraseña. Si no has
                sido tu quien ha solicitado cambiar la contraseña puedes ignorar
                este mensaje.
              </p>
            </td>
          </tr>
    
          <tr style="height: 50px; min-height: 50px">
            <td>
              <a
                href="${url}"
                target="_blank"
                style="
                  font-family: Arial;
                  background-color: #ea0029;
                  color: white;
                  padding: 10px 15px;
                  font-size: 20px;
                  border-radius: 10px;
                  text-decoration: none;
                "
                >Cambiar contraseña</a
              >
            </td>
          </tr>
    
          <tr>
            <td>
              <p
                style="
                  font-family: Arial;
                  color: #163d6b;
                  font-weight: bold;
                  font-size: 30px;
                "
              >
                Contáctanos
              </p>
            </td>
          </tr>
    
          <tr style="text-align: center">
            <td>
              <a href="https://www.instagram.com/_inothy/" target="_blank">
                <img
                  src="https://inothy.com/email/instagram.png"
                  style="height: 50px; min-height: 50px; margin: 0 10px"
                  alt="instagram"
                  title="instagram"
                  width="50px"
                  height="50px"
                />
              </a>
              <a href="https://twitter.com/_inothy" target="_blank">
                <img
                  src="https://inothy.com/email/twitter.png"
                  style="height: 50px; min-height: 50px; margin: 0 10px"
                  alt="twitter"
                  title="twitter"
                  width="50px"
                  height="50px"
                />
              </a>
            </td>
          </tr>
    
          <tr style="height: 150px; min-height: 150px">
            <td>
              <a href="https://inothy.com" target="_blank">
                <img
                  src="https://inothy.com/email/isologo.png"
                  style="height: 70px; min-height: 70px"
                  alt="logo inothy"
                  title="logo inothy"
                  width="225px"
                  height="70"
                />
              </a>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
  try {
    return transpoerter.sendMail(message);
  } catch (error) {
    throw new Error("Email not sent");
  }
}
