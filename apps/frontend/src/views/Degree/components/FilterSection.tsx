import { css } from '@styled-system/css'

interface Props {
  title: string
  children: React.ReactNode
}

export default function FilterSection({ title, children }: Props): JSX.Element {
  return (
    <section className={css({ display: 'flex', flexDir: 'column', gap: 'xs' })}>
      <span
        className={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          letterSpacing: '0.05em',
          color: 'grey.500',
          textTransform: 'uppercase',
        })}
      >
        {title}
      </span>
      {children}
    </section>
  )
}
