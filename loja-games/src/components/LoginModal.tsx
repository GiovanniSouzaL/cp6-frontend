import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCadastro: () => void;
  aviso?: string;
}

export default function LoginModal({ isOpen, onRequestClose, onCadastro, aviso }: LoginModalProps) {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const fechar = () => {
    setEmail("");
    setSenha("");
    setError("");
    onRequestClose();
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha);
    if (res) {
      setError(res);
      setSenha("");
      return;
    }

    fechar();
    navigate("/jogos");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={fechar}
      contentLabel="Acesso ao Portal"
      className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-sm mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black/60 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Acesso ao Portal</h2>
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="text-red-500 font-bold text-lg hover:text-red-700 cursor-pointer"
        >
          X
        </button>
      </div>

      {aviso && (
        <p role="status" className="mb-3 p-2 rounded bg-green-100 text-green-700 text-sm text-center">
          {aviso}
        </p>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <label htmlFor="login-email" className="sr-only">E-mail</label>
        <input
          id="login-email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />
        <label htmlFor="login-senha" className="sr-only">Senha</label>
        <input
          id="login-senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded text-gray-800"
        />

        {error && <span role="alert" className="text-red-500 text-center text-sm">{error}</span>}

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded mt-2 cursor-pointer"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={onCadastro}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Criar uma conta
        </button>
      </p>
    </Modal>
  );
}
