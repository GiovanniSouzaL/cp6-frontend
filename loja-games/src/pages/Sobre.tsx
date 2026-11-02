type Integrante = {
  nome: string;
  rm: string;
  foto: string;
  linkedin: string;
  github: string;
};

const integrantes: Integrante[] = [
  {
    nome: "Giovanni de Souza Lima",
    rm: "556536",
    foto: "/integrantes/giovanni.jpg",
    linkedin: "https://www.linkedin.com/in/giovanni-de-souza-lima-2770943b5/",
    github: "https://github.com/GiovanniSouzaL",
  },
];

export default function Sobre() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sobre o projeto</h1>
      <p className="text-gray-600 max-w-3xl mb-10">
        A Loja de Games é o Checkpoint 6 da disciplina de Front-End Design Engineering (1TDSPI,
        Análise e Desenvolvimento de Sistemas - FIAP), feito com React, TypeScript, Vite,
        Tailwind CSS, React Router, useContext, json-server, localStorage e react-modal.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrante</h2>

      <ul className="flex flex-wrap justify-center sm:justify-start gap-6">
        {integrantes.map((pessoa) => (
          <li
            key={pessoa.rm}
            className="w-72 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg text-center"
          >
            <img
              src={pessoa.foto}
              alt={`Foto de ${pessoa.nome}`}
              className="w-40 h-40 rounded-full object-cover mx-auto mt-6"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{pessoa.nome}</h3>
              <p className="text-pink-400">RM {pessoa.rm}</p>
              <p className="mt-3 flex justify-center gap-4 text-sm">
                <a href={pessoa.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
                <a href={pessoa.github} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
