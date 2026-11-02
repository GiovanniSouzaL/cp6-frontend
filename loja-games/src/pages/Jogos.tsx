import { useEffect, useState } from "react";
import CardJogo from "../components/CardJogo";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../api";
import type { Jogo } from "../types";

export default function Jogos() {
  const { user, toggleDesejo } = useAuth();

  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarJogos = async () => {
      try {
        const response = await fetch(`${API_URL}/jogos`);
        const data = await response.json();
        setJogos(data);
      } catch (error) {
        console.error("Erro ao buscar jogos", error);
        setErro("Erro ao carregar os jogos.");
      }
    };

    carregarJogos();
  }, []);

  const desejos = user?.desejos ?? [];
  const jogosDesejados = jogos.filter((jogo) => desejos.includes(jogo.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Galeria de Jogos</h1>
      <p className="text-gray-600 mb-8">
        Clique no botão de desejos para guardar o jogo na sua lista.
      </p>

      {erro && <p role="alert" className="text-red-600">{erro}</p>}

      <section aria-labelledby="titulo-desejos" className="mb-12 p-6 rounded-xl bg-pink-50 border border-pink-200">
        <h2 id="titulo-desejos" className="text-xl font-bold text-pink-700 mb-4">
          ♥ Minha lista de desejos ({jogosDesejados.length})
        </h2>

        {jogosDesejados.length === 0 ? (
          <p className="text-gray-600">Você ainda não adicionou nenhum jogo à lista de desejos.</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {jogosDesejados.map((jogo) => (
              <li
                key={jogo.id}
                className="flex items-center gap-3 bg-white border border-pink-200 rounded-lg pl-3 pr-2 py-2"
              >
                <span className="font-semibold text-gray-800">{jogo.titulo}</span>
                <button
                  type="button"
                  onClick={() => toggleDesejo(jogo.id)}
                  aria-label={`Remover ${jogo.titulo} da lista de desejos`}
                  className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="titulo-jogos">
        <h2 id="titulo-jogos" className="text-xl font-bold text-gray-900 mb-4">
          Todos os jogos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jogos.map((jogo) => (
            <CardJogo
              key={jogo.id}
              jogo={jogo}
              desejado={desejos.includes(jogo.id)}
              onDesejo={toggleDesejo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
