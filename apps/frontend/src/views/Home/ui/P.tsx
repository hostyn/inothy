import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

export const pStyle = cva({
  base: {
    fontSize: 'xl',
    md: {
      fontSize: '2xl',
    },
    fontFamily: 'nunitoSans',
    lineHeight: '1.3',
    color: 'text',
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
  },

  defaultVariants: {
    textAlign: 'center',
  },
})

export const P = styled('p', pStyle)
