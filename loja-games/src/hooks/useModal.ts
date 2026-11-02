import { useContext } from "react";
import { ModalContext } from "../context/modal";

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("O hook useModal deve ser usado dentro de um <ModalProvider>");
  }

  return context;
};

export default useModal;
