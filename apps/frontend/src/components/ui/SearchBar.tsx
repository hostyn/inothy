import { css } from '@styled-system/css'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar(): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        bg: 'grey.100',
        width: 'max-content',
        padding: 'token(spacing.xs) token(spacing.sm)',
        borderRadius: 'md',
        color: 'primary.500',
        transition: 'background 0.1s ease-in-out',
        outline: '1px solid token(colors.grey.100)',

        _hover: {
          bg: 'white',
        },

        _focusVisible: {
          outline: '3px solid token(colors.primary.300)',
        },
      })}
    >
      <input
        placeholder="Universidad, asignatura..."
        className={css({
          bg: 'transparent',
          color: 'primary.500',

          _placeholder: {
            color: 'primary.500',
          },

          _focus: {
            outline: 'none',
          },
        })}
      />
      <AiOutlineSearch size={16} />
    </div>
  )
}
