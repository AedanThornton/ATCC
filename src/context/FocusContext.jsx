import { createContext, useContext, useState } from "react";

const FocusContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });

  const openModal = (type, data) => setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: null, data: null });

  return (
    <FocusContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </FocusContext.Provider>
  );
}

export const useModal = () => useContext(FocusContext);