import Link from "next/link";
import Button from "../../components/Button";
import Text from "../../components/Text";

export default function Pending() {
  return (
    <>
      <Text
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
      >
        Revisando información
      </Text>
      <Text textAlign="center">
        Estamos verificando tu identidad, este proceso puede tardar algunas
        horas.
      </Text>
      <Text textAlign="center">¡Mientras tanto puedes subir tus apuntes!</Text>
      <Link href="/upload" passHref>
        <Button margin="1rem auto 0 auto" height="auto" padding="0.5rem 1rem">
          Subir apuntes
        </Button>
      </Link>
    </>
  );
}
