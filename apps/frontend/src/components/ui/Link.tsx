import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'
import NextLink from 'next/link'

const linkStyles = cva({
  base: {
    fontWeight: '700',
    lineHeight: '1.5',
    cursor: 'pointer',

    _hover: {
      textDecoration: 'underline',
    },
  },
  variants: {
    visual: {
      primary: {
        color: 'primary.500',
      },
      footer: {
        color: 'gray.700',
      },
      warning: {
        color: 'red.600',
      },
    },

    size: {
      md: {
        fontSize: 'md',
      },
      sm: { fontSize: 'sm' },
    },
  },

  defaultVariants: {
    visual: 'primary',
    size: 'md',
  },
})

export const Link = styled(NextLink, linkStyles)
export const LinkButton = styled('button', linkStyles)
