Projeto da disciplina Front-End Design Engineering, turma 1TDSPI (FIAP).

## Integrante

- Giovanni de Souza Lima - RM 556536

## Link do projeto no GitHub

https://github.com/GiovanniSouzaL/cp6-frontend

## Tecnologias

React, Vite, TypeScript, Tailwind CSS, React Router, useContext, json-server, localStorage e react-modal.

## Como rodar

O projeto fica dentro da pasta `loja-games`.

```bash
cd loja-games
npm install
npm run backend
npm run dev
```

O `npm run backend` sobe o json-server na porta 5000 e o `npm run dev` abre o site (normalmente em http://localhost:5173). Os dois precisam ficar rodando ao mesmo tempo, cada um em um terminal.

Usuário para testar: `admin@admin.com` com a senha `123`. Também dá para criar uma conta nova pelo botão de cadastro.

## Páginas

- Home: apresentação da loja, banner de promoções e jogos em super promoção, com botões que abrem os modais de login e de cadastro.
- Jogos: só para quem está logado, com os cards dos jogos e o botão de desejos.
- Sobre: integrante com RM e foto.
