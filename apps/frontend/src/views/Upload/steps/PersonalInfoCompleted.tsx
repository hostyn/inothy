import { css } from '@styled-system/css'
import TabContent from '../TabContent'
import type { StepProps } from '../types'
import UploadEndIcon from '../icons/UploadEnd'
// import { Link } from '@ui/Link'

export default function PersonalInfoCompleted({
  prev,
  next,
  value,
  title,
  ...props
}: StepProps): JSX.Element {
  return (
    <TabContent
      value={value}
      title={title}
      onSubmit={e => {
        e.preventDefault()
        next()
      }}
      {...props}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column-reverse',
          alignItems: 'center',
          gap: '5xl',

          lg: {
            flexDirection: 'row',
          },
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'lg',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'md',
            })}
          >
            <h1
              className={css({
                fontFamily: 'nunitoSans',
                fontSize: '2xl',
                color: 'text',
                fontWeight: '700',
                textAlign: 'center',
                lineHeight: '1.1',

                lg: {
                  textAlign: 'left',
                },
              })}
            >
              ¡Ya puedes subir apuntes!
            </h1>
            <p
              className={css({
                textAlign: 'center',
                fontSize: 'lg',
                color: 'grey.500',
                maxWidth: '50ch',

                lg: {
                  textAlign: 'left',
                },
              })}
            >
              Recuerda que para retirar tu dinero es necesario que verifiques tu
              identidad aportando documentación oficial.
            </p>
          </div>
          {/* <Link href="/info" weight="normal" visual="grey">
            Más información sobre la verificación.
          </Link> */}
        </div>
        <UploadEndIcon />
      </div>
    </TabContent>
  )
}
