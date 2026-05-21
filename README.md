# HR Portal

Sistema interno de gestão de RH com controle de funcionários e registro de ponto.

## Demo

Frontend: https://hr-portal-sandy-three.vercel.app
Backend: https://hr-portal-sc2t.onrender.com

Acesso demo: admin@hrportal.com / 123456

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
- JWT Authentication

## Como rodar

**1. Suba o banco com Docker**

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

- Autenticação JWT com login e logout
- Cadastro e listagem de funcionários com paginação
- Busca de funcionários
- Controle de ponto com entrada e saída por funcionário
- Dashboard com dados reais do banco
- API REST completa