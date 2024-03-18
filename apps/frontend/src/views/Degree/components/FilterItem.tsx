import type { IconProps } from '@components/icons'
import { css } from '@styled-system/css'

interface FilterItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: (props: IconProps) => JSX.Element
  title: string
  selected?: boolean
}

export default function FilterItem({
  Icon,
  title,
  selected = false,
  ...props
}: FilterItemProps): JSX.Element {
  return (
    <button
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        width: 'calc(100% - 6px)',
        px: 'xs',
        py: '2xs',
        mx: '3px',
        borderRadius: 'md',
        transition: 'outline-width 50ms ease',

        bg: selected ? 'primary.300' : 'transparent',
        color: selected ? 'white' : 'grey.500',
        stroke: selected ? 'white' : 'grey.500',

        _hover: {
          // outline: '3px solid token(colors.grey.200)',
        },

        _focus: {
          outline: '3px solid token(colors.primary.200)',
        },
      })}
      {...props}
    >
      <Icon
        size={16}
        className={css({
          strokeWidth: 1.5,
        })}
      />
      <span
        title={title}
        className={css({
          fontSize: 'sm',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left',
        })}
      >
        {title}
      </span>
    </button>
  )
}
