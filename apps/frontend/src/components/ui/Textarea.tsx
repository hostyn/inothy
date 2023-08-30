import { forwardRef } from 'react'
import type { FieldError, ChangeHandler } from 'react-hook-form'
import { css, cx } from '@styled-system/css'
import { MdErrorOutline } from 'react-icons/md'

interface TextArea
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
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
  nativePlaceholder?: string
  keepErrorSpace?: boolean
}

function Input(
  {
    placeholder,
    error,
    className,
    nativePlaceholder,
    keepErrorSpace = false,
    ...props
  }: TextArea,
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
        <textarea
          className={css({
            color: 'primary.500',
            bg: error != null ? 'red.100' : 'grey.100',
            borderRadius: 'md',
            py: 'xs',
            px: 'sm',
            width: '100%',
            transition: 'background 150ms ease, outline-width 50ms ease-in-out',
            resize: 'none',

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
          placeholder={nativePlaceholder ?? ' '}
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
      </div>
      {(keepErrorSpace || error != null) && (
        <div
          className={css({
            width: '100%',
            height: '8xs',
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
          })}
        >
          {error != null && (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default forwardRef(Input)
