import {
  type PanInfo,
  type AnimationOptions,
  animate,
  motion,
  useMotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Page } from './Page'

const transition: AnimationOptions<number> = {
  type: 'spring',
  bounce: 0,
}

interface VisualizedPageCarousel {
  children: ({ index }: { index: number }) => JSX.Element
  visualizedItems: number
  paddingItems: number
}

export const VirtualizedPage = ({
  children,
  visualizedItems,
  paddingItems,
}: VisualizedPageCarousel): JSX.Element => {
  const range = [
    ...[...Array(paddingItems)].map((i, index) => index - paddingItems),
    ...[...Array(visualizedItems)].map((i, index) => index),
    ...[...Array(paddingItems)].map((i, index) => index + visualizedItems),
  ]

  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)

  const calculateNewX = (): number =>
    -index *
    (containerRef.current?.clientWidth != null
      ? containerRef.current?.clientWidth / visualizedItems
      : 0)

  const handleDragStart = (): void => {
    setDragging(true)
  }

  const handleEndDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    setDragging(false)
    const clientWidth =
      containerRef.current?.clientWidth != null
        ? containerRef.current?.clientWidth / visualizedItems
        : 0

    const { offset, velocity } = info

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition)
      return
    }

    const shift = Math.trunc(
      (Math.abs(offset.x) + clientWidth / visualizedItems) / clientWidth
    )

    if (shift === 0) {
      animate(x, calculateNewX(), transition)
      return
    }

    setIndex(index => (offset.x < 0 ? index + shift : index - shift))
  }

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition)
    return controls.stop
  }, [index])

  useEffect(() => {
    const interval = dragging
      ? null
      : setInterval(() => {
          setIndex(index => index + 1)
        }, 5000)

    return () => {
      if (interval != null) clearInterval(interval)
    }
  }, [dragging])

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      {range.map(rangeValue => {
        return (
          <Page
            key={rangeValue + index}
            x={x}
            onDragEnd={handleEndDrag}
            onDragStart={handleDragStart}
            index={rangeValue + index}
            renderPage={children}
            visualizedItems={visualizedItems}
          />
        )
      })}
    </motion.div>
  )
}

VirtualizedPage.displayName = 'VirtualizedPage'
