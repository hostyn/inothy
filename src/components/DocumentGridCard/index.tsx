import Link from 'next/link'
import styled from 'styled-components'
import { colors } from '@config/theme'
import { useAuth } from '@context/authContext'
import mimeTypes from '@util/mimeTypes'
import { currencyFormatter } from '@util/normailize'
import { Img, Span, Text } from '@ui'
import type { Document } from 'types/api'
import { type ForwardedRef, forwardRef } from 'react'

const Card = styled.div`
  aspect-ratio: 1;
  min-width: 15rem;
  max-width: 100%;
  min-height: 20rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70% 30%;
  justify-items: center;
  align-items: center;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    scale: 1.05;
  }
`

const CardTitle = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  border: 3px solid ${colors.primary};
  border-width: 3px 0 0 0;
`

const CardName = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface DocumentGridCardProps {
  documentData: Document
  href: string
}

function DocumentGridCard(
  { documentData, href }: DocumentGridCardProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { user } = useAuth()
  const isDiscountActive = new Date() < new Date('07-01-2023')
  return (
    <Link href={href}>
      <Card ref={ref}>
        <Img
          src={`/icons/files/${
            mimeTypes[documentData.contentType as keyof typeof mimeTypes] ??
            'file.svg'
          }`}
          width="60%"
          height="60%"
        />
        <CardTitle>
          <CardName width="95%" textAlign="center">
            {documentData.name}
          </CardName>
          <Text fontWeight="bold" fontSize="1.2rem">
            {(user?.data?.badge?.includes('ambassador') != null ||
              isDiscountActive) && (
              <Span
                fontSize="1rem"
                color="secondary"
                textDecoration="line-through"
                margin="0 0.5rem 0 0"
                fontWeight="normal"
              >
                {currencyFormatter.format(documentData.price)}
              </Span>
            )}
            {currencyFormatter.format(
              user?.data?.badge?.includes('ambassador') != null
                ? documentData.price * 0.8
                : isDiscountActive
                ? documentData.price * 0.9
                : documentData.price
            )}
          </Text>
        </CardTitle>
      </Card>
    </Link>
  )
}

export default forwardRef(DocumentGridCard)
