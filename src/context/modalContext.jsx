import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";

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
  background-color: #c8c8c8af;
  backdrop-filter: blur(5px);
`;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [Modal, setModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const openModal = (modal) => {
    window.document.body.classList.add("modal-open");
    setModal(modal);
    setShowModal(true);
  };

  const closeModal = async () => {
    window.document.body.classList.remove("modal-open");
    setShowModal(false);
    return new Promise((resolve) => setTimeout(resolve, 330));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <AnimatePresence>
        {showModal && (
          <Backdrop
            initial={{ opacity: 0, blur: 0 }}
            animate={{ opacity: 1, blur: 5 }}
            exit={{ opacity: 0, blur: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => closeModal()}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
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
  );
};
