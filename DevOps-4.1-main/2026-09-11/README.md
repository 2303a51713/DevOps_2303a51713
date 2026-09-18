# Student API Server

A secure Express API with JWT authentication and protected student routes.

## Setup

```bash
cd 2026-09-11
npm install
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Set a stronger secret in a real environment:

```powershell
$env:JWT_SECRET = 'replace-with-a-long-random-secret'
```

## Test with curl

Register a user:

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"secret123\",\"role\":\"user\"}"
```

Login and copy the returned `token`:

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"secret123\"}"
```

Use the token to read students:

```bash
curl http://localhost:3000/students -H "Authorization: Bearer YOUR_TOKEN"
```

Use the token to add a student:

```bash
curl -X POST http://localhost:3000/students -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"Anika\",\"department\":\"CSE\"}"
```

Requests to `/students` without a valid token return `401 Unauthorized`.
