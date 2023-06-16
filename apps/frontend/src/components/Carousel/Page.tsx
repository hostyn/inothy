import { motion, type MotionValue, type PanInfo } from 'framer-motion'
import { useMemo } from 'react'

interface PageProps {
  index: number
  x: MotionValue<number>
  visualizedItems: number
  renderPage: ({ index }: { index: number }) => JSX.Element
  onDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void
}

export const Page = ({
  index,
  renderPage,
  x,
  onDragEnd,
  visualizedItems,
  onDragStart,
}: PageProps): JSX.Element => {
  const child = useMemo(() => renderPage({ index }), [index, renderPage])

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: `${100 / visualizedItems}%`,
        height: '100%',
        x,
        left: `${(index * 100) / visualizedItems}%`,
        right: `${(index * 100) / visualizedItems}%`,
      }}
      draggable
      drag="x"
      dragElastic={1}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      {child}
    </motion.div>
  )
}

Page.displayName = 'page'
