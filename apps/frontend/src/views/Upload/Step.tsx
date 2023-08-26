import { css } from '@styled-system/css'

export default function StepCard({
  number,
  title,
  description,
  Icon,
}: {
  number: number
  title: string
  description: string
  Icon: () => JSX.Element
}): JSX.Element {
  return (
    <li
      className={css({
        display: 'grid',
        gridTemplateColumns: '12px 1fr 64px',
        gap: 'md',
        fontFamily: 'var(--nunito-sans)',
        color: 'text',
      })}
    >
      <span
        className={css({
          fontSize: 'lg',
          fontWeight: 'bold',
          lineHeight: '100%',
        })}
      >
        {number}
      </span>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 'sm',
        })}
      >
        <h2
          className={css({
            fontSize: 'lg',
            fontWeight: 'bold',
            lineHeight: '100%',
          })}
        >
          {title}
        </h2>
        <p
          className={css({
            lineHeight: '100%',
            color: 'grey.500',
          })}
        >
          {description}
        </p>
      </div>
      <div
        className={css({
          height: '64px',
          width: '64px',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Icon />
      </div>
    </li>
  )
}
