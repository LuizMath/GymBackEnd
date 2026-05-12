# GymBackEnd — API Vital Ativa

API REST que atende o front end Vital Ativa. Trabalho da disciplina de Programação Web (ICEV).

## Stack

- **Fastify 5** — web framework
- **Prisma 6/7** — ORM
- **MySQL / MariaDB**
- **Zod 4** — validação de payloads
- **moment.js** — manipulação de datas
- **Brasil API** — feriados nacionais (`POST /schedules/holidays`)

## Estrutura

```
src/
├─ app.ts                  # Bootstrap Fastify + registro de plugins/rotas
├─ server.ts               # listen()
├─ controllers/            # Camada HTTP
├─ services/               # Regras de negócio + acesso ao Prisma
├─ schemas/                # Zod schemas de entrada
├─ routes/                 # Definição das rotas
├─ utils/
│  ├─ generateAgenda.ts    # Datas disponíveis (exclui domingo)
│  └─ prisma.ts            # Plugin Prisma
└─ lib/prisma.ts           # Cliente Prisma compartilhado
prisma/
├─ schema.prisma           # Models + enums
└─ seed.ts                 # Seed inicial (planos, modalidades, horários)
```

## Endpoints

| Método | Rota                     | Descrição                                                 |
| ------ | ------------------------ | --------------------------------------------------------- |
| GET    | `/plans?objective=...`   | Lista planos (filtro opcional por objetivo)               |
| POST   | `/createUser`            | Cria usuário (apenas e-mail)                              |
| POST   | `/getUser`               | Busca usuário por e-mail                                  |
| GET    | `/schedules?name=...`    | Grade de horários (filtro opcional por modalidade)        |
| POST   | `/schedules/holidays`    | Feriados nacionais via Brasil API (`{ year: number }`)    |
| POST   | `/enrollment`            | Cria matrícula                                            |
| POST   | `/booking`               | Agenda aula (precisa enrollment + schedule + data)        |
| POST   | `/booking/experimental`  | Agenda aula experimental (visitante anônimo)              |
| GET    | `/team`                  | Lista equipe                                              |

## Modelo de dados (resumo)

- `User` ─ id, email
- `Plans` ─ id, name, price, duration_months, description, has_phys_eval, has_nutritionist, has_app_access
- `Modalities` ─ id, name, description, objective (`HIPERTROFIA | EMAGRECIMENTO | RELAXAMENTO`)
- `PlansOnModalities` ─ N:N entre planos e modalidades
- `Schedules` ─ id, modalityId, day_of_week (`SEGUNDA…SABADO`), start_time, end_time, max_capacity, needs_booking
- `Enrollments` ─ id, full_name, cpf, email?, phone?, birthdate?, planId, userId, preferred_time, zip_code, street, number, complement?, neighborhood?, city?, state?, terms_accepted, created_at
- `Experimental_Leads` ─ id, name, contact, modalityId, status (`PENDENTE | CONTATADO | REALIZADO`)
- `Booking` ─ id, enrollmentId, scheduleId, booking_date, status (`PENDENTE | CONFIRMADO | CANCELADO | FALTOU`)
- `Team` ─ id, name, qualification, photo_url

## Pré-requisitos

- Node.js 20+
- MySQL 8 ou MariaDB 11

## Variáveis de ambiente

Criar `.env` na raiz:

```bash
DATABASE_URL="mysql://user:password@localhost:3306/gymvitalativa"
```

## Setup

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed   # (ou: npx tsx prisma/seed.ts)
npm run dev
```

API em `http://localhost:3001`.

## Observações de implementação

- `getAvailablesDays()` libera segunda a sábado (apenas domingo é bloqueado).
- `preferred_time` na matrícula precisa chegar como `HH:mm` (front mapeia "manhã/tarde/noite" para "06:00/12:00/18:00").
- Erros conhecidos do Prisma são traduzidos pelo `setErrorHandler` em `app.ts`
  (P2002 → conflict, P2025 → not found, P2003 → bad request).
- CORS está `origin: "*"` para facilitar desenvolvimento; restringir em produção.
