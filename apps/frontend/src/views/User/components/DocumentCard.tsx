import { css } from '@styled-system/css'
import { type RouterOutputs } from 'backend'

export default function DocumentCard({
  title,
}: RouterOutputs['user']['getDocuments']['documents'][0]): JSX.Element {
  return (
    <div
      className={css({
        borderRadius: 'md',
        padding: 'md',
      })}
    >
      <span>{title}</span>
    </div>
  )
}
