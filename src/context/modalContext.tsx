import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../config/theme'

interface IModalContext {
  openModal: (modal: JSX.Element) => void
  closeModal: () => Promise<unknown>
}

interface ModalProviderProps {
  children: JSX.Element | JSX.Element[]
}

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: ${colors.backdrop};
  backdrop-filter: blur(5px);
`

const dropInAnimation = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 100,
      stiffness: 700,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.3,
      type: 'tween',
    },
  },
}

const backdropAnimation = {
  hidden: { opacity: 0, blur: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, blur: 5 },
  exit: { opacity: 0, blur: 0 },
}

const ModalContext = createContext<IModalContext>({
  openModal: (modal: JSX.Element) => {},
  closeModal: async () => {},
})

export const useModal = (): IModalContext => useContext(ModalContext)

export const ModalProvider = ({
  children,
}: ModalProviderProps): JSX.Element => {
  const [Modal, setModal] = useState<JSX.Element>(<></>)
  const [showModal, setShowModal] = useState<boolean>(false)
  const openModal = (modal: JSX.Element): void => {
    window.document.body.classList.add('modal-open')
    setModal(modal)
    setShowModal(true)
  }

  const closeModal = async (): Promise<unknown> => {
    window.document.body.classList.remove('modal-open')
    setShowModal(false)
    return await new Promise(resolve => setTimeout(resolve, 330))
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <AnimatePresence>
        {showModal && (
          <Backdrop
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropAnimation}
            onClick={closeModal}
          >
            <motion.div
              onClick={e => {
                e.stopPropagation()
              }}
              variants={dropInAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {Modal}
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
      {children}
    </ModalContext.Provider>
  )
}
