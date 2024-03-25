import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

export const titleStyle = cva({
  base: {
    fontSize: '3xl',
    md: {
      fontSize: '6xl',
    },
    fontWeight: '900',
    fontFamily: 'nunitoSans',
    letterSpacing: '-0.04em',
    lineHeight: '1',
    maxW: '30ch',
  },

  variants: {
    textAlign: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },

    visual: {
      text: {
        color: 'text',
      },
      white: {
        color: 'white',
      },
    },
  },

  defaultVariants: {
    textAlign: 'center',
    visual: 'text',
  },
})

export const H1 = styled('h1', titleStyle)
export const H2 = styled('h2', titleStyle)
