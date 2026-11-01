# Student Portfolio

**Student ID:** 24IT009 · Advanced Web Development Frameworks (ITUE301)

Ek j project: React (Vite) portfolio frontend + Node/Express backend with MongoDB (Mongoose).

## Folder structure

```text
.
├── src/                 # React frontend (components, pages, App, main, styles)
├── models/Task.js       # Mongoose Task schema
├── middleware/          # errorHandler.js
├── server.js            # Express + MongoDB Task API
├── index.html
├── vite.config.mjs
├── package.json
└── .env.example
```

## Run

```bash
npm install
copy .env.example .env      # Mac/Linux: cp .env.example .env
```

MongoDB chalu rakho, pachi be terminal ma:

```bash
npm run server   # API       -> http://localhost:5000
npm run dev      # Frontend  -> http://localhost:5173
```

## Task API

| Method | URL        | Purpose        |
| ------ | ---------- | -------------- |
| GET    | /tasks     | Get all tasks  |
| GET    | /tasks/:id | Get task by ID |
| POST   | /tasks     | Create task    |
| PUT    | /tasks/:id | Update task    |
| DELETE | /tasks/:id | Delete task    |

Never commit `.env`.
