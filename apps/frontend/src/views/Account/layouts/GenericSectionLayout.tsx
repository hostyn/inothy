import { css } from '@styled-system/css'
import { Button } from '@ui/Button'

export interface GenericSectionLayoutProps {
  children: React.ReactNode
  buttonText?: string
  bottomText: string
  disabled?: boolean
  onSubmit?: () => void | Promise<void>
}

export default function GenericSectionLayout({
  children,
  buttonText,
  bottomText,
  disabled = true,
  onSubmit,
}: GenericSectionLayoutProps): JSX.Element {
  return (
    <form
      className={css({
        border: '2px solid token(colors.grey.100)',
        borderRadius: 'md',
      })}
    >
      {children}
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bg: 'grey.100',
          px: 'md',
          py: 'sm',
        })}
      >
        <p
          className={css({
            color: 'text',
          })}
        >
          {bottomText}
        </p>
        {buttonText != null && (
          <Button disabled={disabled} onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
    </form>
  )
}
