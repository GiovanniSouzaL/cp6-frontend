import { createContext, useState } from "react";
import type { ReactNode } from "react";
import LoginModal from "../components/LoginModal";
import CadastroModal from "../components/CadastroModal";

type ModalContextType = {
  abrirLogin: () => void;
  abrirCadastro: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [loginAberto, setLoginAberto] = useState(false);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [aviso, setAviso] = useState("");

  const abrirLogin = () => {
    setCadastroAberto(false);
    setLoginAberto(true);
  };

  const abrirCadastro = () => {
    setAviso("");
    setLoginAberto(false);
    setCadastroAberto(true);
  };

  const fecharLogin = () => {
    setLoginAberto(false);
    setAviso("");
  };

  const cadastroConcluido = () => {
    setAviso("Cadastro realizado com sucesso! Faça seu login.");
    setCadastroAberto(false);
    setLoginAberto(true);
  };

  return (
    <ModalContext.Provider value={{ abrirLogin, abrirCadastro }}>
      {children}
      <LoginModal
        isOpen={loginAberto}
        onRequestClose={fecharLogin}
        onCadastro={abrirCadastro}
        aviso={aviso}
      />
      <CadastroModal
        isOpen={cadastroAberto}
        onRequestClose={() => setCadastroAberto(false)}
        onLogin={abrirLogin}
        onSucesso={cadastroConcluido}
      />
    </ModalContext.Provider>
  );
};
