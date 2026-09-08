# Student Course Management System

Express REST API backed by PostgreSQL and Sequelize.

## Setup

1. Create a PostgreSQL database named `university_db`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` for your PostgreSQL installation.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Sequelize synchronizes the `students` table when the server starts.

## Endpoints

- `POST /students`
- `GET /students`
- `GET /students/:id`
- `PUT /students/:id`
- `DELETE /students/:id`

`GET /students` supports `department`, `year`, `course`, and `sort`. Use `sort=student_name:asc` or `sort=student_name:desc`.
