export type Jogo = {
  id: string;
  titulo: string;
  genero: string;
  preco: number;
  promocao: boolean;
  precoPromocional?: number;
  imagem: string;
};

export type User = {
  id?: string;
  nome?: string;
  email: string;
  senha?: string | number; // o json-server guarda como 'senha' (pode ser número no db.json)
  desejos?: string[]; // ids dos jogos da lista de desejos
};
