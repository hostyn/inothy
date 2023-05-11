import { REFUSE_REASONS } from '@config/constants'
import { useAuth } from '@context/authContext'
import { Button, Flex, Text } from '@ui'
import { kycDocument } from 'mangopay2-nodejs-sdk'
import Link from 'next/link'
import { KYCBaseProps } from '.'

export default function Refused({
  setState,
}: Omit<KYCBaseProps, 'setUserData' | 'userData'>) {
  const { user } = useAuth()
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100%">
      <Text
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        color="secondary"
      >
        ¡Tus documentos se han rechazado!
      </Text>
      <Text textAlign="center">
        {
          REFUSE_REASONS[
            user?.data
              ?.mangopayKYCRefusedReasonType as kycDocument.KYCDocumentRefusedReasonType
          ]
        }
      </Text>
      <Text>
        Por favor, revisa las condiciones antes de volver a subir un documento.
      </Text>
      <Button
        margin="1rem auto 0 auto"
        height="auto"
        padding="0.5rem 1rem"
        onClick={() => setState('completeProfileInfo')}
      >
        Verificar identidad
      </Button>
    </Flex>
  )
}
