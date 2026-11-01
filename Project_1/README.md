# Student Portfolio

**Student ID:** 24IT009  
**Subject:** Advanced Web Development Frameworks (ITUE301)

A single integrated project consisting of a **React (Vite) Portfolio Frontend** and a **Node.js/Express Backend** connected to MongoDB using Mongoose.

## Folder Structure

```text
.
├── src/                 # React frontend (components, pages, App, main, styles)
├── models/
│   └── Task.js          # Mongoose Task schema
├── middleware/
│   └── errorHandler.js  # Error-handling middleware
├── server.js            # Express server and MongoDB Task API
├── index.html
├── vite.config.mjs
├── package.json
└── .env.example
```

## Installation and Setup

Install the project dependencies:

```bash
npm install
```

Create a `.env` file from the example file:

```bash
copy .env.example .env
```

For Mac/Linux:

```bash
cp .env.example .env
```

Make sure MongoDB is running. Then open two separate terminals.

**Terminal 1 – Backend Server**

```bash
npm run server
```

API URL: `http://localhost:5000`

**Terminal 2 – Frontend Development Server**

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## Task API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

## Security Note

**Never commit the `.env` file to GitHub.** It may contain sensitive information such as database credentials and secret keys. Use `.env.example` to share the required environment variable structure.
