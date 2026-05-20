# HR Portal — Backend

API REST desenvolvida com NestJS + PostgreSQL + Docker para o sistema de gestão de RH.

## Tecnologias

- NestJS — framework Node.js
- TypeScript
- TypeORM — ORM para PostgreSQL
- PostgreSQL — banco de dados
- Docker — containerização do banco

## Módulos

- **Employees** — CRUD de funcionários
- **Time Records** — registro de ponto (entrada/saída)
- **Auth** — autenticação JWT (em desenvolvimento)

## Rotas

    GET    /api/employees
    POST   /api/employees
    GET    /api/employees/:id
    PUT    /api/employees/:id
    DELETE /api/employees/:id

    GET    /api/time-records
    POST   /api/time-records
    GET    /api/time-records/employee/:id

## Como rodar localmente

    # Suba o banco com Docker
    docker-compose up -d

    # Instale as dependências
    npm install

    # Crie o .env com as variáveis
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=hr_portal
    JWT_SECRET=sua_secret_key

    # Rode o backend
    npm run start:dev

API disponível em http://localhost:3001