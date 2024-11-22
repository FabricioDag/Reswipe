# BackEnd aplicação swipe

## Continued development:
 - Refatorar Typescript
 - Rodar no Render
 - Rota/ Gerenciador de Badges
 - Alterar rotas de Posts do feed

## log 19/11/2024:
  - Models User, Recipe e Post adicionados campos e alguns erros de sintaxe corrigidos;
  - Model Badge criado
  - Controllers Alterados para melhor compreensão


## Docs

### Server.js
Arquivo principal
Conecta com o banco de dados via mongoose (Mover para arquivo separado)
Importa App.js

### App.js
Cria as rotas

### @Routes.js
Exportam rotas agrupadas

### @Controller.js
Controlam a lógica das rotas

### auth.js
Middleware que assegura o login do usuário