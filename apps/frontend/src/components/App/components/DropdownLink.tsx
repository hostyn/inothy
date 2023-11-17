import { Item as DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { css } from '@styled-system/css'
import { Link, LinkButton } from '@ui/Link'
import { type IconType } from 'react-icons'

interface DropdownLinkProps {
  Icon?: IconType
  name: string
  href?: string
  onClick?: () => void
}

const linkStyles = css({
  fontSize: 'sm',
  color: 'primary.500',
  fontWeight: '500',
  width: 'calc(token(sizes.xl) - token(spacing.md) * 2)',
  p: 'xs',
  display: 'flex',
  gap: 'sm',
  alignItems: 'center',
  minHeight: '32px',

  _focus: {
    outline: 'none',
    bg: 'primary.100',
  },

  _hover: {
    outline: 'none',
    bg: 'primary.100',
  },
})

const logoutStyles = css({
  fontSize: 'sm',
  width: 'calc(token(sizes.xl) - token(spacing.md) * 2)',
  p: 'xs',
  display: 'flex',
  gap: 'sm',
  alignItems: 'center',
  minHeight: '32px',

  _focus: {
    bg: 'red.100',
    outline: 'none',
  },
})

export default function DropdownLink({
  Icon,
  href,
  name,
  onClick,
}: DropdownLinkProps): JSX.Element {
  return (
    <DropdownMenuItem
      asChild
      className={href != null ? linkStyles : logoutStyles}
    >
      {href != null ? (
        <Link focus="disabled" hover="disabled" href={href} weight="normal">
          {Icon != null && <Icon size={16} />}
          {name}
        </Link>
      ) : (
        <LinkButton
          visual="warning"
          size="sm"
          hover="disabled"
          focus="disabled"
          onClick={onClick}
        >
          {Icon != null && <Icon size={16} />}
          {name}
        </LinkButton>
      )}
    </DropdownMenuItem>
  )
}
