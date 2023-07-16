import { css } from '@styled-system/css'
import { MdErrorOutline } from 'react-icons/md'
import { toast } from 'sonner'

export const toastError = (errorMsg: string): void => {
  toast.custom(t => (
    <button
      onClick={() => toast.dismiss(t)}
      className={css({
        width: '350px',
        bg: 'red.100',
        padding: 'sm',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'md',
        gap: 'sm',
        color: 'red.500',
        cursor: 'pointer',
      })}
    >
      <MdErrorOutline size={20} className={css({ width: '20px' })} />
      <p
        className={css({
          textAlign: 'left',
        })}
      >
        {errorMsg}
      </p>
    </button>
  ))
}
