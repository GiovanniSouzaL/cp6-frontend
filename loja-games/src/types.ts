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
  senha?: string | number;
  desejos?: string[];
};
