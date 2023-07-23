import * as RAlertDialog from '@radix-ui/react-alert-dialog'
import { css } from '@styled-system/css'

export interface AlertDialogProps {
  children: React.ReactNode
  dialogTitle: string
  dialogDescription: string
  dialogCancelText?: string
  dialogConfirmText?: string
  dialogOnConfirm: () => void
  dialogTriggerType?: 'button' | 'reset' | 'submit'
}

export default function AlertDialog({
  children,
  dialogTitle,
  dialogDescription,
  dialogCancelText = 'Cancelar',
  dialogConfirmText = 'Confirmar',
  dialogOnConfirm,
  dialogTriggerType = 'button',
}: AlertDialogProps): JSX.Element {
  return (
    <RAlertDialog.Root>
      <RAlertDialog.Trigger asChild type={dialogTriggerType}>
        {children}
      </RAlertDialog.Trigger>
      <RAlertDialog.Portal>
        <RAlertDialog.Overlay
          className={css({
            bg: '#838D9990',
            backdropFilter: 'blur(2px)',
            position: 'fixed',
            inset: '0',

            '&[data-state="closed"]': {
              animation: 'overlayHide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },

            '&[data-state="open"]': {
              animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
          })}
        />
        <RAlertDialog.Content
          className={css({
            bg: 'white',
            borderRadius: 'md',
            boxShadow: 'regular',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '3xl',
            maxHeight: '85vh',
            padding: 'lg',
            display: 'flex',
            flexDirection: 'column',
            gap: 'md',

            '&[data-state="closed"]': {
              animation: 'contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },

            '&[data-state="open"]': {
              animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },

            _focus: {
              outline: 'none',
            },
          })}
        >
          <RAlertDialog.Title
            className={css({
              color: 'primary.600',
              fontSize: 'md',
              fontWeight: '700',
            })}
          >
            {dialogTitle}
          </RAlertDialog.Title>
          <RAlertDialog.Description
            className={css({
              color: 'primary.500',
              fontSize: 'sm',
              lineHeight: 1.5,
            })}
          >
            {dialogDescription}
          </RAlertDialog.Description>
          <div
            className={css({
              display: 'flex',
              gap: 'md',
              justifyContent: 'flex-end',
            })}
          >
            <RAlertDialog.Cancel asChild>
              <button
                className={css({
                  color: 'primary.500',
                  bg: 'primary.100',
                  py: 'xs',
                  px: 'sm',
                  borderRadius: 'md',
                  transition: 'outline-width 50ms ease-in-out',
                  cursor: 'pointer',

                  _focus: {
                    outline: '3px solid token(colors.primary.200)',
                  },

                  _hover: {
                    outline: '3px solid token(colors.primary.200)',
                  },
                })}
              >
                {dialogCancelText}
              </button>
            </RAlertDialog.Cancel>
            <RAlertDialog.Action asChild>
              <button
                className={css({
                  color: 'red.500',
                  bg: 'red.100',
                  py: 'xs',
                  px: 'sm',
                  borderRadius: 'md',
                  transition: 'outline-width 50ms ease-in-out',
                  cursor: 'pointer',

                  _focus: {
                    outline: '3px solid token(colors.red.200)',
                  },

                  _hover: {
                    outline: '3px solid token(colors.red.200)',
                  },
                })}
                onClick={dialogOnConfirm}
              >
                {dialogConfirmText}
              </button>
            </RAlertDialog.Action>
          </div>
        </RAlertDialog.Content>
      </RAlertDialog.Portal>
    </RAlertDialog.Root>
  )
}
