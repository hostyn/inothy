import AlertDialog, { type AlertDialogProps } from '@components/AlertDialog'
import { css } from '@styled-system/css'
import { Button } from '@ui/Button'

export interface GenericSectionLayoutProps
  extends Omit<AlertDialogProps, 'dialogTriggerType'> {
  children: React.ReactNode
  buttonContent?: React.ReactNode
  bottomText: string
  disabled?: boolean
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  buttonTitle?: string
}

export default function GenericSectionLayout({
  children,
  buttonTitle,
  buttonContent,
  bottomText,
  disabled = true,
  onSubmit,
  ...props
}: GenericSectionLayoutProps): JSX.Element {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
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
        {buttonContent != null && (
          <AlertDialog dialogTriggerType="submit" {...props}>
            <Button disabled={disabled} title={buttonTitle}>
              {buttonContent}
            </Button>
          </AlertDialog>
        )}
      </div>
    </form>
  )
}
