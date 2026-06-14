# Sistema de Gestão de Projetos e Alocação de Membros - Mega Jr.

Sistema web desenvolvido para apoiar a Mega Jr. no gerenciamento de projetos, membros, alocações e carga de trabalho da equipe.

O projeto foi desenvolvido como parte do Processo Seletivo 2026 da Mega Jr., com foco em um MVP funcional, integração entre front-end e back-end, persistência em banco de dados e documentação da API.

---

## Links do projeto

**Repositório GitHub:**
https://github.com/leticiarsmc/sistema-gestao-projetos-megajr

**Protótipo Figma:**
https://www.figma.com/site/aDpy69RiqXV6Yfrr6mfrSE/Site-MegaJr?node-id=0-1&t=vPMX8p9rcRisQuIl-1

**Swagger local:**
http://localhost:3000/api-docs

> O Swagger é acessado localmente com o back-end em execução.

---

## Objetivo do sistema

O sistema tem como objetivo centralizar informações sobre membros, projetos e alocações da Mega Jr., permitindo visualizar:

* quais membros fazem parte da equipe;
* quais projetos estão cadastrados;
* quais membros estão alocados em cada projeto;
* qual responsabilidade cada membro possui;
* qual é a carga de trabalho atual da equipe.

---

## Perfis do sistema

O sistema trabalha com três perfis principais:

| Perfil  | Descrição                                                           |
| ------- | ------------------------------------------------------------------- |
| Admin   | Possui acesso ao gerenciamento de membros, projetos e alocações.    |
| Diretor | Possui acesso à visualização gerencial dos dados e indicadores.     |
| Membro  | Possui acesso à visualização dos projetos e das próprias alocações. |

---

## Funcionalidades principais

### Admin

* Cadastrar membros.
* Listar membros.
* Editar membros.
* Remover membros.
* Visualizar projetos.
* Gerenciar dados principais do sistema.

### Diretor

* Visualizar membros.
* Visualizar projetos.
* Acompanhar indicadores da equipe.
* Consultar o dashboard de carga de trabalho.

### Membro

* Visualizar projetos cadastrados.
* Visualizar suas próprias alocações.
* Acompanhar tarefas locais relacionadas às suas entregas.

---

## Observação sobre login e usuários

Neste MVP, os usuários de acesso são criados previamente pela seed para fins de demonstração.

O cadastro de membros gerencia a base da equipe e suas informações, como nome, e-mail, cargo/função e habilidades. Porém, nesta versão, cadastrar um novo membro pela interface ainda não gera automaticamente uma conta de login.

A criação de usuários de acesso pela interface do Admin, com definição de senha, perfil e vínculo com membro, fica como evolução futura do sistema.

Fluxo atual do MVP:

```text
Seed cria usuários de demonstração → usuário faz login → sistema identifica perfil → usuário acessa sua tela
```

Exemplo:

```text
Usuário com perfil MEMBER → acessa Dashboard do Membro
Usuário com perfil ADMIN → acessa Dashboard do Admin
Usuário com perfil DIRECTOR → acessa Dashboard do Diretor
```

---

## Tecnologias utilizadas

### Front-end

* React
* Vite
* JavaScript
* CSS

### Back-end

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Swagger

### Ferramentas

* Git
* GitHub
* Figma
* Swagger UI

---

## Estrutura geral do projeto

```text
sistema-gestao-projetos-megajr/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── routes/
│       ├── services/
│       ├── server.js
│       └── swagger.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── DashboardAdmin.jsx
│   ├── DashboardDev.jsx
│   ├── DashboardGerente.jsx
│   ├── Login.jsx
│   └── App.jsx
├── package.json
└── README.md
```

---

## Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/leticiarsmc/sistema-gestao-projetos-megajr.git
cd sistema-gestao-projetos-megajr
```

---

## Configuração do back-end

Entre na pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na pasta `backend` com a variável de conexão do banco:

```env
DATABASE_URL="sua_url_do_postgresql"
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Execute a seed:

```bash
npm run seed
```

Inicie o servidor:

```bash
npm run dev
```

Ou:

```bash
node src/server.js
```

O back-end ficará disponível em:

```text
http://localhost:3000
```

---

## Configuração do front-end

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie o front-end:

```bash
npm run dev
```

O front-end ficará disponível em:

```text
http://localhost:5173
```

---

## Documentação da API

A API possui documentação em Swagger.

Com o back-end rodando, acesse:

```text
http://localhost:3000/api-docs
```

A documentação contém os endpoints principais do sistema, incluindo membros, projetos, alocações, dashboard, autenticação e rotas de status.

---

## Endpoints principais

### Status

```http
GET /
GET /health
```

### Autenticação

```http
POST /auth/login
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

## Dashboard e regra de carga

O dashboard considera como projetos ativos aqueles com status:

```text
IN_PROGRESS
```

A carga dos membros é classificada da seguinte forma:

| Projetos ativos | Status     | Cor    |
| --------------- | ---------- | ------ |
| 0               | FREE       | GREEN  |
| 1 ou 2          | NORMAL     | YELLOW |
| 3 ou mais       | OVERLOADED | RED    |

---

## Status dos projetos

| Status interno | Exibição     |
| -------------- | ------------ |
| PLANNING       | Planejamento |
| IN_PROGRESS    | Em andamento |
| DONE           | Concluído    |
| CANCELLED      | Cancelado    |

---

## Base de demonstração

A seed cria dados de demonstração para facilitar a apresentação e os testes do MVP.

### Membros

* Samyr — Front-end
* Yan — Design
* Letícia — Back-end
* Elias — Back-end
* Ana Clara — Full Stack
* Pedro H. — QA
* Mariana S. — UI/UX
* João Victor — Product Owner

### Projetos

* Mega Junior
* Portal Institucional
* Dashboard de Indicadores
* App Interno
* Sistema de Chamados

### Alocações

* Samyr no Mega Junior — Front-end
* Yan no Mega Junior — Design
* Letícia no Mega Junior — Back-end
* Elias no Mega Junior — Back-end
* Ana Clara no Dashboard de Indicadores — Full Stack
* Pedro H. no App Interno — QA
* Mariana S. no Portal Institucional — UI/UX
* João Victor no Sistema de Chamados — Product Owner

---

## Testes e validação

Durante o desenvolvimento, foram realizados testes manuais para validar:

* login real com perfis diferentes;
* carregamento dos dados do usuário logado;
* CRUD de membros;
* listagem de projetos;
* alocações;
* dashboard de carga;
* seed de demonstração;
* documentação Swagger;
* build do front-end;
* integração entre front-end e back-end.

Para validar o build do front-end:

```bash
npm run build
```

---

## Decisões do MVP

Algumas decisões foram mantidas simples por se tratar de um MVP de processo seletivo:

* os usuários de login são criados pela seed;
* o cadastro de membros não cria automaticamente login e senha;
* as permissões são simples e baseadas no perfil do usuário;
* o Swagger é executado localmente;
* o sistema não possui deploy publicado nesta versão.

Esses pontos podem ser evoluídos em versões futuras.

---

## Possíveis evoluções futuras

* Permitir que o Admin crie usuários de acesso pela interface.
* Vincular manualmente um usuário a um membro já cadastrado.
* Implementar recuperação de senha.
* Melhorar controle de permissões por rota.
* Criar testes automatizados.
* Publicar o sistema em ambiente de produção.

---

## Equipe

| Integrante | Responsabilidade |
| ---------- | ---------------- |
| Letícia    | Back-end         |
| Elias      | Back-end         |
| Samyr      | Front-end        |
| Yan        | Design           |

---

## Considerações finais

O Sistema de Gestão de Projetos e Alocação de Membros foi desenvolvido para atender ao case técnico da Mega Jr., apresentando uma solução funcional para organização de membros, projetos, alocações e carga de trabalho.

A aplicação integra front-end, back-end, banco de dados, documentação Swagger e protótipo visual, mantendo uma estrutura simples e adequada ao escopo de um MVP.
