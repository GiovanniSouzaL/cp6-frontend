import type { Jogo } from "../types";

type CardJogoProps = {
  jogo: Jogo;
  desejado?: boolean;
  onDesejo?: (jogoId: string) => void;
};

const formatar = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CardJogo({ jogo, desejado = false, onDesejo }: CardJogoProps) {
  const emPromocao = jogo.promocao && jogo.precoPromocional !== undefined;
  const desconto = emPromocao
    ? Math.round((1 - jogo.precoPromocional! / jogo.preco) * 100)
    : 0;

  return (
    <article className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
      <div className="relative">
        <img src={jogo.imagem} alt={`Capa do jogo ${jogo.titulo}`} className="w-full aspect-[4/5] object-cover" />
        {emPromocao && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-sm font-bold px-2 py-1 rounded">
            -{desconto}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 grow">
        <h3 className="text-lg font-bold">{jogo.titulo}</h3>
        <p className="text-sm text-gray-400">{jogo.genero}</p>

        <div className="mt-auto">
          {emPromocao ? (
            <p>
              <span className="text-gray-500 line-through text-sm mr-2">{formatar(jogo.preco)}</span>
              <span className="text-green-400 font-bold text-lg">{formatar(jogo.precoPromocional!)}</span>
            </p>
          ) : (
            <p className="font-bold text-lg">{formatar(jogo.preco)}</p>
          )}
        </div>

        {onDesejo && (
          <button
            type="button"
            onClick={() => onDesejo(jogo.id)}
            aria-pressed={desejado}
            className={
              desejado
                ? "mt-2 py-2 rounded font-bold bg-pink-600 hover:bg-pink-700 cursor-pointer"
                : "mt-2 py-2 rounded font-bold border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white cursor-pointer"
            }
          >
            {desejado ? "♥ Na lista de desejos" : "♡ Adicionar aos desejos"}
          </button>
        )}
      </div>
    </article>
  );
}
