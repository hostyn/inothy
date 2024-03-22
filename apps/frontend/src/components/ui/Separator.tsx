import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

const separatorStyles = cva({
  base: {
    height: '2px',
    minHeight: '2px',
    width: '100%',
  },
  variants: {
    visual: {
      regular: {
        bg: 'grey.100',
      },

      dark: {
        bg: 'grey.200',
      },
    },

    size: {
      sm: {
        height: '1px',
        minHeight: '1px',
      },
      md: {
        height: '2px',
        minHeight: '2px',
      },
    },
  },
  defaultVariants: {
    visual: 'regular',
    size: 'md',
  },
})

export const Separator = styled('div', separatorStyles)
