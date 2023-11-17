import { css } from '@styled-system/css'

const ProfileInfo = (): JSX.Element => {
  return (
    <section
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          23 {/* TODO: Sacar del endpoint */}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
          })}
        >
          Documentos
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          4.3{/* TODO: Sacar del endpoint */}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
          })}
        >
          V. Media
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: '700',
            color: 'token(colors.grey.500)',
          })}
        >
          5 {/* TODO: Sacar del endpoint */}
        </p>
        <p
          className={css({
            color: 'token(colors.grey.400)',
            fontSize: 'md',
            fontWeight: '600',
            lineHeight: 'md',
          })}
        >
          Valoraciones
        </p>
      </div>
    </section>
  )
}
export default ProfileInfo
