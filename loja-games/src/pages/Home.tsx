import { useEffect, useState } from "react";
import { Link } from "react-router";
import CardJogo from "../components/CardJogo";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import { API_URL } from "../api";
import type { Jogo } from "../types";

export default function Home() {
  const { signed, user } = useAuth();
  const { abrirLogin, abrirCadastro } = useModal();

  const [promocoes, setPromocoes] = useState<Jogo[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarPromocoes = async () => {
      try {
        const response = await fetch(`${API_URL}/jogos?promocao=true`);
        const data = await response.json();
        setPromocoes(data);
      } catch (error) {
        console.error("Erro ao buscar promoções", error);
        setErro("Não foi possível carregar as promoções. O json-server está rodando? (npm run backend)");
      }
    };

    carregarPromocoes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Apresentação da loja */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Bem-vindo à <span className="text-pink-600">Loja de Games</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Os melhores jogos de todos os gêneros em um só lugar. Cadastre-se, faça login,
          explore nossa galeria e monte a sua lista de desejos!
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {signed ? (
            <>
              <p className="w-full text-gray-700">
                Olá, <strong>{user?.nome ?? user?.email}</strong>! Que bom te ver de novo.
              </p>
              <Link
                to="/jogos"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-lg"
              >
                Ver todos os jogos
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={abrirLogin}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-lg cursor-pointer"
              >
                Fazer login
              </button>
              <button
                type="button"
                onClick={abrirCadastro}
                className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold px-6 py-3 rounded-lg cursor-pointer"
              >
                Não tenho cadastro
              </button>
            </>
          )}
        </div>
      </section>

      {/* Banner de promoções */}
      <section
        aria-label="Banner de promoções"
        className="rounded-2xl bg-pink-600 text-white text-center py-12 px-6 shadow-lg"
      >
        <p className="uppercase tracking-widest text-sm font-semibold">Semana dos Games</p>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2">Super Promoção</h2>
        <p className="mt-3 text-lg">Até 50% de desconto em jogos selecionados. Aproveite antes que acabe!</p>
      </section>

      {/* Área de promoções */}
      <section className="py-10" aria-labelledby="titulo-promocoes">
        <h2 id="titulo-promocoes" className="text-2xl font-bold text-gray-900 mb-6">
          Jogos em super promoção
        </h2>

        {erro && <p role="alert" className="text-red-600">{erro}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promocoes.map((jogo) => (
            <CardJogo key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </section>
    </div>
  );
}
