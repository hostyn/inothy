import { css } from '@styled-system/css'
import GenericSectionLayout, {
  type GenericSectionLayoutProps,
} from './GenericSectionLayout'

interface SectionLayoutProps extends GenericSectionLayoutProps {
  title: string
  description: string
}

export default function SectionLayout({
  children,
  title,
  description,
  ...props
}: SectionLayoutProps): JSX.Element {
  return (
    <GenericSectionLayout {...props}>
      <div
        className={css({
          p: 'md',
          display: 'flex',
          flexDirection: 'column',
          gap: 'sm',
        })}
      >
        <h2 className={css({ color: 'text', fontWeight: '700' })}>{title}</h2>
        <p className={css({ fontSize: 'sm', color: 'text' })}>{description}</p>
        {children}
      </div>
    </GenericSectionLayout>
  )
}
