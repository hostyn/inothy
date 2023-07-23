import { css } from '@styled-system/css'
import { MdErrorOutline, MdOutlineCheckCircleOutline } from 'react-icons/md'
import { toast } from 'sonner'

export const toastError = (errorMsg: string): void => {
  toast.custom(t => (
    <button
      onClick={() => toast.dismiss(t)}
      className={css({
        bg: 'red.100',
        padding: 'sm',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'md',
        gap: 'sm',
        color: 'red.500',
        cursor: 'pointer',
        boxShadow: 'regular',
        width: '350px',
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

export const toastSuccess = (successMsg: string): void => {
  toast.custom(t => (
    <button
      onClick={() => toast.dismiss(t)}
      className={css({
        bg: 'green.100',
        padding: 'sm',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'md',
        gap: 'sm',
        color: 'green.700',
        cursor: 'pointer',
        boxShadow: 'regular',
        width: '350px',
      })}
    >
      <MdOutlineCheckCircleOutline
        size={20}
        className={css({ width: '20px' })}
      />
      <p
        className={css({
          textAlign: 'left',
        })}
      >
        {successMsg}
      </p>
    </button>
  ))
}
