import { AnimatePresence, motion } from 'framer-motion'

interface MotionDivProps {
  state: any
  children: any
  className?: string
}

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 100,
      stiffness: 1000,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.1,
      type: 'tween',
    },
  },
}

export default function MotionDiv({
  state,
  children,
  className,
}: MotionDivProps): JSX.Element {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={className}
        key={state}
        animate="animate"
        initial="initial"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
