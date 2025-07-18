import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'
import NextLink from 'next/link'

const linkStyles = cva({
  base: {
    lineHeight: '1.5',
    cursor: 'pointer',
    borderRadius: 'md',
    transition: 'outline-width 50ms ease-in-out',
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
      grey: {
        color: 'grey.500',
      },
    },

    size: {
      md: {
        fontSize: 'md',
      },
      sm: { fontSize: 'sm' },
    },

    weight: {
      normal: {
        fontWeight: '500',
      },
      bold: {
        fontWeight: '700',
      },
    },

    focus: {
      enabled: {
        _focusVisible: {
          outline: '3px solid token(colors.primary.300)',
          outlineOffset: '2px',
        },
      },
      disabled: {},
    },

    hover: {
      enabled: {
        _hover: {
          textDecoration: 'underline',
        },
      },
      disabled: {},
    },
  },

  defaultVariants: {
    visual: 'primary',
    size: 'md',
    focus: 'enabled',
    hover: 'enabled',
    weight: 'bold',
  },
})

export const Link = styled(NextLink, linkStyles)
export const LinkButton = styled('button', linkStyles)
