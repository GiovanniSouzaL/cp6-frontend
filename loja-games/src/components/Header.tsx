import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";

export default function Header() {
  const { signed, user, signout } = useAuth();
  const { abrirLogin, abrirCadastro } = useModal();

  const handleJogos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!signed) {
      e.preventDefault();
      abrirLogin();
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-2xl font-bold text-pink-500">
          Loja de <span className="text-white">Games</span>
        </Link>

        <nav aria-label="Menu principal" className="flex items-center gap-5">
          <Link to="/" className="hover:text-pink-400">Home</Link>
          <Link to="/jogos" onClick={handleJogos} className="hover:text-pink-400">Jogos</Link>
          <Link to="/sobre" className="hover:text-pink-400">Sobre</Link>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {signed ? (
            <>
              <span className="flex items-center gap-2" role="status">
                <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true"></span>
                Logado como <strong>{user?.nome ?? user?.email}</strong>
              </span>
              <button
                type="button"
                onClick={signout}
                className="border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-3 py-1 rounded cursor-pointer"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 text-gray-300" role="status">
                <span className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true"></span>
                Você não está logado
              </span>
              <button
                type="button"
                onClick={abrirLogin}
                className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded font-bold cursor-pointer"
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={abrirCadastro}
                className="border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white px-3 py-1 rounded cursor-pointer"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
