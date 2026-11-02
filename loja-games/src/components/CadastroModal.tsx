import { useState } from "react";
import Modal from "react-modal";
import useAuth from "../hooks/useAuth";

interface CadastroModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onLogin: () => void;
  onSucesso: () => void;
}

export default function CadastroModal({ isOpen, onRequestClose, onLogin, onSucesso }: CadastroModalProps) {
  const { signup } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");

  const limpar = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmar("");
    setError("");
  };

  const fechar = () => {
    limpar();
    onRequestClose();
  };

  const handleCadastro = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !email || !senha || !confirmar) {
      setError("Preencha todos os campos");
      return;
    }
    if (senha !== confirmar) {
      setError("As senhas não conferem");
      return;
    }

    const res = await signup(nome, email, senha);
    if (res) {
      setError(res);
      return;
    }

    limpar();
    onSucesso();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={fechar}
      contentLabel="Criar conta"
      className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-sm mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black/60 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Criar conta</h2>
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="text-red-500 font-bold text-lg hover:text-red-700 cursor-pointer"
        >
          X
        </button>
      </div>

      <form onSubmit={handleCadastro} className="flex flex-col gap-3">
        <label htmlFor="cad-nome" className="sr-only">Nome</label>
        <input
          id="cad-nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />
        <label htmlFor="cad-email" className="sr-only">E-mail</label>
        <input
          id="cad-email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />
        <label htmlFor="cad-senha" className="sr-only">Senha</label>
        <input
          id="cad-senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />
        <label htmlFor="cad-confirmar" className="sr-only">Confirmar senha</label>
        <input
          id="cad-confirmar"
          type="password"
          placeholder="Confirmar senha"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />

        {error && <span role="alert" className="text-red-500 text-center text-sm">{error}</span>}

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded mt-2 cursor-pointer"
        >
          Cadastrar
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Já tem uma conta?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Fazer login
        </button>
      </p>
    </Modal>
  );
}
