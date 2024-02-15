import { css } from '@styled-system/css'

const FormElement = ({
  label,
  children,
}: {
  label: string
  children: JSX.Element
}): JSX.Element => (
  <label
    className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
      width: '100%',
    })}
  >
    <span
      className={css({
        fontSize: 'md',
        fontWeight: '700',
        lineHeight: '100%',
        color: 'text',
      })}
    >
      {label}
    </span>
    {children}
  </label>
)

export default FormElement
