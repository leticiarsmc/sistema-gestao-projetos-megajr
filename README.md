# Sistema de Gestão de Projetos - Mega Jr.

Sistema web desenvolvido para auxiliar a Mega Jr. no gerenciamento de projetos, membros, alocações e carga de trabalho da equipe.

O projeto possui três perfis de acesso:

* **Admin**: gerenciamento completo de membros, projetos e alocações.
* **Diretor**: visualização gerencial dos dados e acompanhamento da carga da equipe.
* **Membro**: visualização dos projetos e acompanhamento local das próprias entregas.

---

## Tecnologias utilizadas

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* Swagger

---

## Funcionalidades principais

### Admin

* Cadastro de membros.
* Edição de membros.
* Remoção de membros.
* Cadastro e acompanhamento de projetos.
* Gerenciamento de alocações.
* Visualização de dados reais vindos do backend.

### Diretor

* Visualização dos projetos.
* Visualização dos membros.
* Painel de carga de trabalho.
* Resumo operacional da equipe.
* Acesso somente leitura, sem ações de CRUD.

### Membro

* Visualização dos projetos.
* Visualização das próprias alocações.
* Quadro local de tarefas de entrega.
* Interface simplificada para acompanhamento individual.

---

## Perfis de acesso

Use os seguintes logins para testar o sistema:

| Perfil  | Usuário   | Senha     |
| ------- | --------- | --------- |
| Admin   | `admin`   | `admin`   |
| Diretor | `diretor` | `diretor` |
| Membro  | `membro`  | `membro`  |

---

## Base de demonstração

O projeto possui uma seed para popular o banco com dados de exemplo.

### Membros cadastrados

* Samyr — Front-end
* Yan — Design
* Letícia — Back-end
* Elias — Back-end
* Ana Clara — Full Stack
* Pedro H. — QA
* Mariana S. — UI/UX
* João Victor — Product Owner

### Projetos cadastrados

* Mega Junior — Em andamento
* Portal Institucional — Planejamento
* Dashboard de Indicadores — Em andamento
* App Interno — Concluído
* Sistema de Chamados — Em andamento

### Alocações cadastradas

* Samyr no Mega Junior — Front-end
* Yan no Mega Junior — Design
* Letícia no Mega Junior — Back-end
* Elias no Mega Junior — Back-end
* Ana Clara no Dashboard de Indicadores — Full Stack
* Pedro H. no App Interno — QA
* Mariana S. no Portal Institucional — UI/UX
* João Victor no Sistema de Chamados — Product Owner

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd sistema-gestao-projetos-megajr
```

---

## Rodando o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com a URL do banco PostgreSQL:

```env
DATABASE_URL="sua_url_do_postgresql"
```

Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

Rode a seed:

```bash
npm run seed
```

Inicie o backend:

```bash
npm run dev
```

O backend será iniciado em:

```text
http://localhost:3000
```

---

## Rodando o frontend

Em outro terminal, volte para a raiz do projeto e instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

O frontend será iniciado em:

```text
http://localhost:5173
```

---

## Documentação da API

A documentação da API foi criada com Swagger.

Com o backend rodando, acesse:

```text
http://localhost:3000/api-docs
```

Na documentação é possível visualizar os principais endpoints da API, incluindo:

* Status da API
* Membros
* Projetos
* Alocações
* Dashboard

---

## Endpoints principais

### Status

```http
GET /
GET /health
```

### Membros

```http
GET /members
POST /members
GET /members/:id
PUT /members/:id
DELETE /members/:id
```

### Projetos

```http
GET /projects
POST /projects
GET /projects/:id
PUT /projects/:id
DELETE /projects/:id
```

### Alocações

```http
GET /allocations
POST /allocations
GET /allocations/:id
PUT /allocations/:id
DELETE /allocations/:id
```

### Dashboard

```http
GET /dashboard/summary
```

---

## Dashboard de carga

O endpoint de resumo do dashboard calcula:

* Total de membros.
* Total de projetos.
* Total de projetos ativos.
* Membros livres.
* Membros com carga normal.
* Membros sobrecarregados.
* Lista de carga individual por membro.

Projetos ativos são considerados aqueles com status:

```text
IN_PROGRESS
```

---

## Status dos projetos

Internamente, os projetos usam os seguintes status:

| Status interno | Exibição     |
| -------------- | ------------ |
| `PLANNING`     | Planejamento |
| `IN_PROGRESS`  | Em andamento |
| `DONE`         | Concluído    |
| `CANCELLED`    | Cancelado    |

---

## Estrutura geral do projeto

```text
sistema-gestao-projetos-megajr/
├── backend/
│   ├── prisma/
│   │   └── seed.js
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── lib/
│       ├── server.js
│       └── swagger.js
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── DashboardAdmin.jsx
│   ├── DashboardGerente.jsx
│   └── DashboardDev.jsx
└── README.md
```

---

## Validações realizadas

Durante o desenvolvimento, foram validados:

* Login dos três perfis.
* CRUD real de membros no Admin.
* Atualização automática da lista de membros após cadastro, edição e exclusão.
* Dados coerentes entre Admin, Diretor e Membro.
* Seed idempotente para base de demonstração.
* Dashboard de carga usando dados reais do backend.
* Correção visual da tela de Membro.
* Sidebar fixa e botão de sair visível.
* Documentação Swagger acessível em `/api-docs`.
* Build do frontend executado com sucesso.

---

## Observações

Este projeto foi desenvolvido com foco em clareza, organização e funcionamento para um processo seletivo da Mega Jr.

A proposta é demonstrar:

* Integração entre frontend e backend.
* Uso de banco de dados relacional.
* Organização em camadas no backend.
* CRUD com dados reais.
* Visualização por diferentes perfis de acesso.
* Documentação simples da API.
