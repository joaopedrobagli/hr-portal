# HR Portal

Sistema interno de gestão de RH com controle de funcionários e registro de ponto.

## Estrutura

    hr-portal/
    ├── frontend/   # React + Vite + TypeScript + Tailwind
    ├── backend/    # NestJS + TypeScript + PostgreSQL
    └── docker-compose.yml

## Tecnologias

**Frontend**
- React + Vite + TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

**Backend**
- NestJS + TypeScript
- TypeORM + PostgreSQL
- Docker

## Como rodar

**1. Suba o banco**

    docker-compose up -d

**2. Backend**

    cd backend
    npm install
    npm run start:dev

**3. Frontend**

    cd frontend
    npm install
    npm run dev

Frontend: http://localhost:5173
Backend: http://localhost:3001

## Funcionalidades

- Cadastro e listagem de funcionários
- Busca e paginação
- Registro de ponto com entrada e saída
- API REST documentada