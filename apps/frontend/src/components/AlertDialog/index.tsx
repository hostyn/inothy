import * as RAlertDialog from '@radix-ui/react-alert-dialog'
import { css } from '@styled-system/css'

interface AlertDialogProps {
  children: React.ReactNode
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onConfirm: () => void
}

export default function AlertDialog({
  children,
  title,
  description,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  onConfirm,
}: AlertDialogProps): JSX.Element {
  return (
    <RAlertDialog.Root>
      <RAlertDialog.Trigger asChild>{children}</RAlertDialog.Trigger>
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
            {title}
          </RAlertDialog.Title>
          <RAlertDialog.Description
            className={css({
              color: 'primary.500',
              fontSize: 'sm',
              lineHeight: 1.5,
            })}
          >
            {description}
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

                  _focus: {
                    outline: '3px solid token(colors.primary.200)',
                  },
                })}
              >
                {cancelText}
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

                  _focus: {
                    outline: '3px solid token(colors.red.200)',
                  },
                })}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </RAlertDialog.Action>
          </div>
        </RAlertDialog.Content>
      </RAlertDialog.Portal>
    </RAlertDialog.Root>
  )
}
