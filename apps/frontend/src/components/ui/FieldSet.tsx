import { css } from '@styled-system/css'

const FieldSet = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <fieldset
    className={css({
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      gap: 'md',
    })}
  >
    {children}
  </fieldset>
)

export default FieldSet
