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

export const sendVerificationEmail = async (email, url) => {
  const message = {
    from: "Inothy <noreply@inothy.com>",
    to: email,
    subject: "Verifica tu correo electrónico",
    text: `Para verificar tu correo electrónico, haz click en el siguiente enlace: ${url}`,
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        
      </head>
      <body style='background-color:#c3b1ff;width:100%;max-width:800px;font-family:"Roboto", sans-serif;padding:2rem 0;'>
        <div id="image" style="text-align:center;width:100%;margin:2rem 0 0 0;">
          <img src="https://inothy.com/logo.png" alt="inothy-logo" style="max-width:30%;min-width:100px;"/>
        </div>
        <div id="wrapper" style="background-color:#e8e8fd;border-radius:10px;margin:1rem 2rem 2rem 2rem;padding:1rem;text-align:center;">
          <h1 style="font-size:1.5rem;font-weight:bold;margin:1rem;color:#6967a4;">Nos alegramos de que estés aquí,</h1>
          <h2 style="text-align:center;font-size:1.2rem;font-weight:500;color:#0158ff;margin:1rem;">${email}</h2>
          <a href="${url}" style="text-decoration:none;">
            <h3 style="font-size:1.2rem;font-weight:bold;color:#ffffff;background-color:#6967a4;border-radius:100px;padding:0.5rem;margin:1rem;">VERIFICAR</h3>
          </a>
          <p style="font-size:0.8rem;margin:0 3rem 1rem 3rem;color:#6967a4;">
            Verifica tu correo electrónico para acceder a la oferta del 20% de descuento y obtener la
            insignia de embajador.
          </p>
        </div>
      </body>
    </html>
    `,
  };
  try {
    await transpoerter.sendMail(message);
  } catch (error) {
    throw new Error("Email not sent");
  }
};

export const sendPasswordResetEmail = async (email, url) => {
  const message = {
    from: "Inothy <noreply@inothy.com>",
    to: email,
    subject: "Restablece tu contraseña",
    text: `Para restablecer tu contraseña, haz click en el siguiente enlace: ${url}`,
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        
      </head>
      <body style='background-color:#c3b1ff;width:100%;max-width:800px;font-family:"Roboto", sans-serif;padding:2rem 0;'>
        <div id="image" style="text-align:center;width:100%;margin:2rem 0 0 0;">
          <img src="https://inothy.com/logo.png" alt="inothy-logo" style="max-width:30%;min-width:100px;"/>
        </div>
        <div id="wrapper" style="background-color:#e8e8fd;border-radius:10px;margin:1rem 2rem 2rem 2rem;padding:1rem;text-align:center;">
          <h1 style="font-size:1.5rem;font-weight:bold;margin:1rem;color:#6967a4;">Hola,</h1>
          <h2 style="text-align:center;font-size:1.2rem;font-weight:500;color:#0158ff;margin:1rem;">${email}</h2>
          <h1 style="font-size:1.5rem;font-weight:bold;margin:1rem;color:#6967a4;">Parece que has olvidado tu contraseña</h1>
          <a href="${url}" style="text-decoration:none;">
            <h3 style="font-size:1.2rem;font-weight:bold;color:#ffffff;background-color:#6967a4;border-radius:100px;padding:0.5rem;margin:1rem;">RESTABLECER CONTRASEÑA</h3>
          </a>
          <p style="font-size:0.8rem;margin:0 3rem 1rem 3rem;color:#6967a4;">
            Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.
          </p>
        </div>
      </body>
    </html>`,
  };
  try {
    await transpoerter.sendMail(message);
  } catch (error) {
    throw new Error("Email not sent");
  }
};
