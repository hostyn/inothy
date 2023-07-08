import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'
import NextLink from 'next/link'

export const buttonStyle = cva({
  base: {
    fontWeight: '600',
    lineHeight: '1.5',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',

    _focusVisible: {
      outline: '3px solid token(colors.primary.300)',
    },
  },
  variants: {
    visual: {
      primary: {
        bg: 'primary.500',
        color: 'white',

        _hover: {
          bg: 'primary.800',
        },
      },

      secondary: {
        bg: 'grey.100',
        color: 'primary.500',

        _hover: {
          bg: 'primary.100',
        },
      },

      action: {
        bg: 'red.400',
        color: 'white',

        _hover: {
          bg: 'red.500',
        },
      },
    },
    size: {
      md: {
        borderRadius: 'md',
        px: 'sm',
        py: 'xs',
      },
    },
  },
  defaultVariants: {
    visual: 'primary',
    size: 'md',
  },
})

export const Button = styled('button', buttonStyle)
export const ButtonLink = styled(NextLink, buttonStyle)
