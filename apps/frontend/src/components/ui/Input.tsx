import { forwardRef } from 'react'
import type { FieldError, ChangeHandler } from 'react-hook-form'
import { css, cx } from '@styled-system/css'
import { type IconType } from 'react-icons'
import { MdErrorOutline } from 'react-icons/md'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder?: string
  className?: string
  onChange?: ChangeHandler | ((e: any) => void)
  onBlur?: ChangeHandler
  type?: string
  name?: string
  error?: FieldError
  autoComplete?: string
  value?: string
  Icon?: IconType
}

function Input(
  { placeholder, error, Icon, className, ...props }: InputProps,
  ref: React.Ref<any>
): JSX.Element {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDir: 'column',
        }),
        className
      )}
    >
      <div className={css({ position: 'relative' })}>
        <input
          className={css({
            color: 'primary.500',
            bg: error != null ? 'red.100' : 'grey.100',
            borderRadius: 'md',
            paddingLeft: 'sm',
            paddingRight: 'xl',
            height: '6xs',
            width: '100%',
            transition: 'background 150ms ease, outline-width 50ms ease-in-out',

            // When the input has value but is not focused
            '&:not(:placeholder-shown)': {
              bg: 'white',
              outline:
                error != null
                  ? '2px solid token(colors.red.200)'
                  : '2px solid token(colors.grey.100)',
              transition:
                'outline-color 150ms ease, background 150ms ease, outline-width 50ms ease-in-out',
            },

            // When the input is focused
            _focus: {
              bg: 'white',
              outline:
                error != null
                  ? '3px solid token(colors.red.300)'
                  : '3px solid token(colors.primary.300)',
            },

            // The label when the input is focused or has value
            '&:focus + label': {
              transform: 'translateY(-150%)',
              fontSize: 'sm',
              px: '2px',
              color: error != null ? 'red.300' : 'primary.300',
              fontWeight: '700',
              bg: 'white',
            },

            '&:not(:placeholder-shown) + label': {
              transform: 'translateY(-150%)',
              fontSize: 'sm',
              px: '2px',
              color: error != null ? 'red.200' : 'grey.200',
              fontWeight: '600',
              bg: 'white',
            },

            // The icon when the input is focused
            '&:focus + label + label svg': {
              fill: error != null ? 'red.300' : 'primary.300',
            },

            // The icon when the input has value
            '&:not(:placeholder-shown) + label + label svg': {
              fill: error != null ? 'red.200' : 'grey.200',
            },

            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: '0',
            },
          })}
          {...props}
          ref={ref}
          title={placeholder}
          placeholder=" "
          aria-invalid={error != null}
          aria-errormessage={error?.message}
        />
        <label
          className={css({
            position: 'absolute',
            color: 'grey.400',
            top: '10px',
            left: 'calc(token(spacing.sm) - 2px)',
            transition: 'all 150ms ease',
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: '.8',
          })}
        >
          {placeholder}
        </label>
        {Icon != null && (
          <label
            className={css({
              position: 'absolute',
              color: 'grey.400',
              top: 'sm',
              right: 'sm',
              transition: 'all 150ms ease',
              pointerEvents: 'none',
              userSelect: 'none',
            })}
          >
            <Icon size={16} className={css({ fill: 'grey.400' })} />
          </label>
        )}
      </div>
      {error != null && (
        <div
          className={css({
            width: '100%',
            height: '8xs',
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
          })}
        >
          <MdErrorOutline
            size={14}
            className={css({
              fill: 'error',
            })}
          />
          <p
            className={css({
              fontSize: 'sm',
              fontWeight: '500',
              color: 'error',
            })}
          >
            {error?.message?.toString()}
          </p>
        </div>
      )}
    </div>
  )
}

export default forwardRef(Input)
