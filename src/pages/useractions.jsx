import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";
import Head from "next/head";
import { auth } from "../config/firebase";
import ResetPassword from "../views/ResetPassword";
import VerifyEmail from "../views/VerifyEmail";

export default function VerifyEmailPage({ mode, verified, oobCode, email }) {
  switch (mode) {
    case "verifyEmail":
      return (
        <>
          <Head>
            <title>Inothy - Email verificado</title>
            <meta name="robots" content="noindex,nofollow" />
          </Head>
          <VerifyEmail verified={verified} />
        </>
      );

    case "resetPassword":
      return (
        <>
          <Head>
            <title>Inothy - Cambiar contraseña</title>
          </Head>
          <ResetPassword valid={verified} oobCode={oobCode} email={email} />
        </>
      );
  }
}

export async function getServerSideProps(context) {
  const {
    query: { oobCode, mode },
  } = context;
  switch (mode) {
    case "verifyEmail":
      try {
        await applyActionCode(auth, oobCode);
        return { props: { mode, verified: true } };
      } catch (e) {
        return { props: { mode, verified: false } };
      }

    case "resetPassword":
      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        return { props: { mode, verified: true, oobCode, email } };
      } catch (e) {
        return { props: { mode, verified: false, oobCode } };
      }
    default:
      return { redirect: { permanent: false, destination: "/" } };
  }
}
