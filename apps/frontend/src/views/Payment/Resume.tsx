import styled from 'styled-components'
import { Img, Text, Button, Flex } from '@ui'
import { colors } from '@config/theme'
import { useAuth } from '@context/authContext'
import { currencyFormatter } from '@util/normailize'
import type { PaymentDetails, PaymentState } from '.'
import type { Dispatch, SetStateAction } from 'react'

const Title = styled(Text)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Separator = styled.div`
  height: 2px;
  background-color: ${colors.hover};
`

const DocumentCard = styled.div`
  display: grid;
  grid-template-columns: 3rem auto min-content;
  gap: 1rem;
  padding: 10px;
  align-items: center;
`

const DoucumentName = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const DocumentPrice = styled(Text)`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

const DiscountText = styled.span`
  font-size: 1.3rem;
  margin: 0 1rem 0 0;
  color: ${colors.secondary};
  text-decoration: line-through;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    margin: 0;
  }
`

const TotalText = styled(Text)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PoweredByMangopay = styled(Img)`
  height: 1.2rem;
  width: calc(1.2rem * 1345 / 152);

  @media (max-width: 768px) {
    height: 1rem;
    width: calc(1rem * 1345 / 152);
  }
`

const StyledButton = styled(Button)`
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

interface ResumeProps {
  paymentDetails: PaymentDetails
  setState: Dispatch<SetStateAction<PaymentState>>
}

export default function Resume({
  paymentDetails,
  setState,
}: ResumeProps): JSX.Element {
  const { user } = useAuth()

  const isDiscountActive = new Date() < new Date('07-01-2023')

  return (
    <Flex height="100%" width="100%">
      <Title fontSize="2rem" fontWeight="bold" margin="0 0 1rem 0">
        Resumen de compra
      </Title>
      <>
        {paymentDetails.documents.map(document => (
          <Flex key={document.id}>
            <Separator />
            <DocumentCard>
              <Img src="/icons/document.svg" />
              <Flex>
                <DoucumentName fontWeight="bold" fontSize="1.2rem">
                  {document.name}
                </DoucumentName>
                <Text fontSize="0.8rem">{document.createdBy}</Text>
              </Flex>
              <DocumentPrice fontSize="2rem" textAlign="end">
                {(user?.data?.badge?.includes('ambassador') != null ||
                  isDiscountActive) && (
                  <DiscountText>
                    {currencyFormatter.format(document.price)}
                  </DiscountText>
                )}
                {currencyFormatter.format(
                  user?.data?.badge?.includes('ambassador') != null
                    ? document.price * 0.8
                    : isDiscountActive
                    ? document.price * 0.9
                    : document.price
                )}
              </DocumentPrice>
            </DocumentCard>
          </Flex>
        ))}
      </>
      <Separator />
      <TotalText textAlign="end" fontSize="2.5rem" margin="1rem 0 0 0">
        Total:{' '}
        {currencyFormatter.format(
          user?.data?.badge?.includes('ambassador') != null
            ? paymentDetails.totalAmount * 0.8
            : isDiscountActive
            ? paymentDetails.totalAmount * 0.9
            : paymentDetails.totalAmount
        )}
      </TotalText>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        margin="auto 0 0 1rem"
        alignItems="center"
      >
        <PoweredByMangopay src="/mangopay.png" />
        <StyledButton
          height="auto"
          padding="0.5rem 1rem"
          margin="0"
          onClick={() => {
            setState('card')
          }}
        >
          Continuar
        </StyledButton>
      </Flex>
    </Flex>
  )
}
