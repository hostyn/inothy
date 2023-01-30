import Link from "next/link";
import Button from "../../components/Button";
import Text from "../../components/Text";

export default function Verified() {
  return (
    <>
      <Text
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
      >
        ¡Ya has verificado tu identidad!
      </Text>
      <Text textAlign="center">
        Ya puedes retirar tu saldo a tu cuenta bancaria
      </Text>
      <Link href="/account/balance" passHref>
        <Button margin="1rem auto 0 auto" height="auto" padding="0.5rem 1rem">
          Retirar
        </Button>
      </Link>
    </>
  );
}
