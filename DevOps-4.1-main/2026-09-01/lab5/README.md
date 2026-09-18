# Student Information Management API

## Setup

1. Start MongoDB locally, or replace `MONGODB_URI` in `.env` with a MongoDB connection string.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the API:

   ```bash
   npm start
   ```

The API uses the `student_db` database by default and listens on port `3000`.

## Endpoints

- `POST /api/students`
- `GET /api/students`
- `PUT` or `PATCH /api/students/:id`
- `DELETE /api/students/:id`
- `GET /api/students/search/:department`
- `GET /api/students/sort/cgpa`
- `GET /api/students/count/total`