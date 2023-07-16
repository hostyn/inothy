import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

const separatorStyles = cva({
  base: {
    height: '2px',
    width: '100%',
  },
  variants: {
    visual: {
      regular: {
        bg: 'grey.100',
      },
    },
  },
  defaultVariants: {
    visual: 'regular',
  },
})

export const Separator = styled('div', separatorStyles)
