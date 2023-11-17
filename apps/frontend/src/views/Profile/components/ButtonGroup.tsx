import { css } from '@styled-system/css'
import { Button } from '@ui/Button'
import {
  MdOutlineLink,
  MdOutlineMap,
  MdOutlineLocalPhone,
  MdOutlineMail,
} from 'react-icons/md'

const ButtonGroup = (): JSX.Element => {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        width: '100%',
      })}
    >
      <Button
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'sm',
        })}
      >
        <span>
          <MdOutlineLink size={18} />
        </span>{' '}
        Sitio web
      </Button>
      <Button
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'sm',
        })}
      >
        <span>
          <MdOutlineMap size={18} />
        </span>{' '}
        Dirección
      </Button>
      <Button
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'sm',
        })}
      >
        <span>
          <MdOutlineLocalPhone size={18} />
        </span>{' '}
        Teléfono
      </Button>
      <Button
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'sm',
        })}
      >
        <span>
          <MdOutlineMail size={18} />
        </span>{' '}
        Email
      </Button>
    </section>
  )
}
export default ButtonGroup
