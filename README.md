# Todo App

Full-stack task management app with categories, undo actions, and bulk operations.

**Stack:** React + TypeScript + Tailwind (frontend), NestJS + SQLite (backend).

## Prerequisites

Node.js 18+, pnpm 9+.

## Running locally

Clone the repo, then in two separate terminals:

```bash
# Backend
cd backend
pnpm install
pnpm run start:dev
```

```bash
# Frontend
cd frontend
pnpm install
pnpm run dev
```

## Environment variables

Create `backend/.env.development` and `backend/.env.production` based on `backend/.env.example`

Create `frontend/.env` based on `frontend/.env.example`

## Did you use AI?

Yes - I used Claude to make the development process more efficient.
It saved a lot of time on boilerplate, helped identify weak spots in the architecture,
assisted with refactoring, and caught subtle bugs like race conditions in the undo flow
and a filter mismatch between frontend and backend