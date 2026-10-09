# itelect4-backend

Express + MongoDB (Mongoose) + JWT backend for **itelect4-project-IT4B**
(the frontend). Resource: `Submission`. Interfaces are copied from the
frontend's `src/types/index.ts`.

## Setup

```bash
npm install
cp .env.example .env     # then fill in MONGODB_URI and JWT_SECRET
npm run dev              # http://localhost:4000
npm run build            # must finish with zero TypeScript errors
```

`MONGODB_URI` must include the database name: `.../itelect4?retryWrites=true`.
`.env` is in `.gitignore` -- never commit it.

## Routes

| Method and path             | Token | Answers                                  |
| --------------------------- | ----- | ---------------------------------------- |
| POST /api/auth/register     | no    | 201 and the user, without the password   |
| POST /api/auth/login        | no    | 200 and `{ token, user }`                |
| GET /api/submissions        | yes   | 200 and this user's rows, newest first   |
| GET /api/submissions/:id    | yes   | 200 and one row, or 404                  |
| POST /api/submissions       | yes   | 201 and the created row                  |
| PATCH /api/submissions/:id  | yes   | 200 and the row after the change         |
| DELETE /api/submissions/:id | yes   | 204, no body                             |

Send `Authorization: Bearer <token>` on every protected route.

