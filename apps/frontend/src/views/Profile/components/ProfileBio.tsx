import { css } from '@styled-system/css'
import { MdOutlineVerified } from 'react-icons/md'

const ProfileBio = (): JSX.Element => {
  return (
    <section
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        width: '100%',
      })}
    >
      <div
        className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}
      >
        <p
          className={css({
            color: 'token(colors.primary.500)',
            fontSize: 'xl',
            fontWeight: '800',
            lineHeight: 'xl',
          })}
        >
          @ USUARIO {/* TODO: Cambiar valor a capón */}
        </p>
        <span>
          <MdOutlineVerified
            size={24}
            className={css({
              borderRadius: '50%',
              color: 'token(colors.primary.400)',
            })}
          />
        </span>
      </div>
      {/* TODO: Cambiar valor a capón */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, officia
        alias. Est hic iure voluptates ab velit numquam accusamus sit? Neque
        nemo ad aliquid sit ipsa earum!
      </p>
    </section>
  )
}
export default ProfileBio
