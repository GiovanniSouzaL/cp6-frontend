const ano = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center text-sm py-6 mt-10">
      <p>© {ano} Loja de Games - Checkpoint 6</p>
      <p>FIAP - Análise e Desenvolvimento de Sistemas - Front-End Design Engineering</p>
    </footer>
  );
}
