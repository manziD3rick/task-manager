# Student Task Manager — Full-Stack Teaching Guide

A 15-day hands-on curriculum for teaching full-stack web development using React, Node.js, Express, and JSON file storage.

## Final Project Structure

```
student-task-manager/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── tasks.js
│   ├── data/
│   │   └── tasks.json
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── api.js
        └── components/
            ├── TaskForm.jsx
            ├── TaskList.jsx
            └── TaskItem.jsx
```

---

## How to Run the Finished App

```bash
# Terminal 1 — start the backend
cd backend
node server.js

# Terminal 2 — start the frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Day-by-Day Teaching Guide

---

### Day 1 — Introduction to React and Project Setup

**Goal:** Students install a React project, understand what a Single Page Application (SPA) is, and render their first component.

#### Concepts to Explain
- What is a frontend framework and why we use one
- What a Single Page Application (SPA) is vs a traditional multi-page website (the page never fully reloads; JavaScript updates what the user sees)
- What React is: a JavaScript library for building UIs using components
- The role of Node.js as a JavaScript runtime (not a server yet — just a tool to run JS outside the browser)
- What Vite is: a build tool that serves our React app in development

#### Files to Create

**`frontend/`** — create this folder manually or using Vite's scaffolding tool.

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

Show students the auto-generated files, then simplify `src/App.jsx` to just:

**`frontend/src/App.jsx`**
```jsx
function App() {
  return (
    <div>
      <h1>Student Task Manager</h1>
    </div>
  );
}

export default App;
```

**`frontend/src/main.jsx`** — explain this is the entry point that mounts the App into `index.html`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**`frontend/index.html`** — show students the `<div id="root">` where React mounts
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Task Manager</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### What to Explain
- The relationship between `index.html` → `main.jsx` → `App.jsx`
- JSX: HTML-like syntax written inside JavaScript
- Why we `export default` a component and `import` it elsewhere
- The browser console and React DevTools

---

### Day 2 — Components and Props

**Goal:** Students learn how to break the UI into reusable components and pass data into them using props.

#### Concepts to Explain
- What a component is: a reusable, self-contained piece of UI (like a function that returns HTML)
- Props: how a parent component passes data down to a child component (one-way data flow)
- Why reusability matters: write once, use many times
- JSX expressions using `{}` to render dynamic values

#### Files to Create

**`frontend/src/components/TaskItem.jsx`**
```jsx
function TaskItem({ task }) {
  return (
    <li>
      <span>{task.title}</span>
    </li>
  );
}

export default TaskItem;
```

**`frontend/src/components/TaskList.jsx`**
```jsx
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
```

**Update `frontend/src/App.jsx`** — pass a hardcoded array as a prop to demonstrate
```jsx
import TaskList from './components/TaskList';

const sampleTasks = [
  { id: 1, title: 'Read Chapter 3', completed: false },
  { id: 2, title: 'Submit lab report', completed: false },
];

function App() {
  return (
    <div>
      <h1>Student Task Manager</h1>
      <TaskList tasks={sampleTasks} />
    </div>
  );
}

export default App;
```

#### What to Explain
- How props flow from parent (`App`) to child (`TaskList`) to grandchild (`TaskItem`)
- Why the `key` prop is required when rendering lists (helps React track which items changed)
- Destructuring props: `function TaskItem({ task })` vs `function TaskItem(props)`
- Components are just functions — they take props in and return JSX out

---

### Day 3 — State with useState

**Goal:** Students understand React state and see how changing state causes the UI to update automatically.

#### Concepts to Explain
- The problem with plain variables in React: changing them does not re-render the UI
- What state is: data that, when changed, causes React to re-render the component
- The `useState` hook: returns a value and a setter function
- The difference between props (passed in, read-only) and state (owned by the component, can change)

#### Files to Update

**`frontend/src/App.jsx`** — replace the hardcoded array with `useState`
```jsx
import { useState } from 'react';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read Chapter 3', completed: false },
    { id: 2, title: 'Submit lab report', completed: false },
  ]);

  return (
    <div>
      <h1>Student Task Manager</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
```

#### What to Explain
- Syntax: `const [value, setValue] = useState(initialValue)`
- React re-renders the component every time `setTasks` is called with a new value
- State is local to a component — each instance has its own state
- Demonstrate: open React DevTools and show the state value changing live

---

### Day 4 — Event Handling and Forms

**Goal:** Students implement adding and deleting tasks by handling user events.

#### Concepts to Explain
- Event handling in React: `onClick`, `onChange`, `onSubmit`
- Controlled inputs: the input's value is always driven by state (React owns the value)
- `e.preventDefault()`: stops the browser from refreshing the page on form submit
- Immutability: never mutate state directly — always create a new array with the change

#### Files to Create

**`frontend/src/components/TaskForm.jsx`**
```jsx
import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
```

#### Files to Update

**`frontend/src/components/TaskItem.jsx`** — add a Delete button
```jsx
function TaskItem({ task, onDelete }) {
  return (
    <li>
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
```

**`frontend/src/components/TaskList.jsx`** — pass `onDelete` down
```jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
```

**`frontend/src/App.jsx`** — add `addTask` and `deleteTask` handlers
```jsx
import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read Chapter 3', completed: false },
  ]);

  function addTask(title) {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h1>Student Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
```

#### What to Explain
- Lifting state up: handlers live in `App` because it owns the `tasks` state; children receive them as props
- Spread operator `[...tasks, newTask]` creates a new array instead of mutating the existing one
- `Array.filter` returns a new array without the deleted item
- `Date.now()` as a simple unique ID

---

### Day 5 — Styling and UI Polish

**Goal:** Students improve the look of the app and learn how to apply CSS in a React project.

#### Concepts to Explain
- How CSS works in a Vite/React project: import a `.css` file and use `className` (not `class`) in JSX
- The difference between global styles and component-scoped styles
- Basic layout techniques: flexbox for rows, spacing, card-style containers

#### Files to Create

**`frontend/src/App.css`**
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  color: #2d3748;
}

.app {
  max-width: 600px;
  margin: 48px auto;
  padding: 0 16px;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 24px;
  text-align: center;
}

.task-form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.task-form input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
}

.task-form button {
  padding: 10px 20px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 14px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.task-item span {
  flex: 1;
}

.task-item button {
  padding: 6px 12px;
  background: #fc8181;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
```

#### Files to Update

- Import `App.css` in `main.jsx`: `import './App.css';`
- Add `className="app"` to the wrapper `<div>` in `App.jsx`
- Add `className="task-form"` to `<form>` in `TaskForm.jsx`
- Add `className="task-list"` to `<ul>` in `TaskList.jsx`
- Add `className="task-item"` to `<li>` in `TaskItem.jsx`

#### What to Explain
- `className` instead of `class` because JSX is JavaScript, and `class` is a reserved keyword
- CSS resets: why `* { box-sizing: border-box; margin: 0; padding: 0; }` is useful
- Flexbox: `display: flex` + `gap` for spacing items in a row or column

---

### Day 6 — Introduction to Node.js and Express

**Goal:** Students understand what a backend is, write their first Express server, and see a response in the browser.

#### Concepts to Explain
- What the backend is: a program that runs on a server, not in the browser
- Why we need a backend: to store data, run business logic, and serve multiple clients
- Node.js: JavaScript runtime that lets us run JS outside the browser
- Express: a minimal web framework for Node.js that makes handling HTTP requests easy
- What a port is: an address on a machine where a service listens for connections

#### Files to Create

**`backend/`** — create this folder at the project root.

```bash
mkdir backend
cd backend
npm init -y
npm install express cors
```

**`backend/server.js`** — start with a single hardcoded route so students see the full flow first
```js
import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, title: 'A task from the server!' }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run it: `node server.js`, then open `http://localhost:3001/api/tasks` in the browser.

#### What to Explain
- `app.get(path, handler)`: registers a route that responds to GET requests
- `req`: the incoming request object (contains URL, body, headers)
- `res`: the response object — we use `res.json()` to send JSON back
- `app.listen(PORT)`: starts the server and makes it available on that port
- The browser is making a GET request when you type a URL — same as `fetch`

---

### Day 7 — REST API with GET, POST, and DELETE Routes

**Goal:** Students implement proper REST API routes using an in-memory array.

#### Concepts to Explain
- What REST means: a convention for designing APIs using HTTP methods to represent actions
  - `GET` → read data
  - `POST` → create data
  - `DELETE` → remove data
  - `PATCH` → update data
- What JSON is and why it's the standard format for APIs
- `express.json()` middleware: parses the incoming request body as JSON so we can read `req.body`
- CORS: why the browser blocks requests from one origin to another, and how `cors()` solves it

#### Files to Update

**`backend/server.js`** — add middleware and mount the router
```js
import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**`backend/routes/tasks.js`** — implement routes with an in-memory array (no file storage yet)
```js
import express from 'express';

const router = express.Router();

let tasks = [
  { id: 1, title: 'Read Chapter 3', completed: false },
];

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

export default router;
```

#### What to Explain
- Route parameters: `:id` in the URL is a variable captured in `req.params.id`
- Status codes: `200` OK, `201` Created, `204` No Content, `404` Not Found
- Middleware: `app.use(cors())` and `app.use(express.json())` run before every route handler
- How to test routes using the browser (GET only) or a tool like Thunder Client / Postman for POST and DELETE

---

### Day 8 — Connecting Frontend to Backend with fetch (GET)

**Goal:** Students fetch tasks from the backend and display them in React instead of using hardcoded data.

#### Concepts to Explain
- What `fetch` is: a built-in browser API to make HTTP requests from JavaScript
- Asynchronous code: network requests take time; `async/await` lets us wait for the result without blocking
- `useEffect`: a React hook that runs code after the component renders — perfect for fetching data
- The empty dependency array `[]` in `useEffect`: means "run this only once when the component first mounts"

#### Files to Update

**`frontend/src/App.jsx`** — replace hardcoded tasks with a fetch call
```jsx
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function addTask(title) {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <h1>Student Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
```

**`frontend/vite.config.js`** — add a proxy so `/api` requests go to the backend
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
```

#### What to Explain
- Why we use `/api/tasks` (relative URL) instead of `http://localhost:3001/api/tasks`: the Vite proxy forwards it, so we don't hardcode the backend URL in every component
- The fetch promise chain: `fetch()` → `.then(res => res.json())` → `.then(data => use data)`
- What happens without `useEffect`: the fetch would run on every re-render, creating an infinite loop

---

### Day 9 — POST Request to Add Tasks

**Goal:** Students send new task data from React to the backend using a POST request.

#### Concepts to Explain
- POST requests send data in the request body (unlike GET which only has a URL)
- `JSON.stringify()`: converts a JavaScript object to a JSON string to send over the network
- `Content-Type: application/json` header: tells the server what format the body is in
- The server creates the task and returns it — the frontend uses the server's version (which has the real ID)

#### Files to Update

**`frontend/src/App.jsx`** — update `addTask` to POST to the backend
```jsx
async function addTask(title) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const newTask = await res.json();
  setTasks([...tasks, newTask]);
}
```

#### What to Explain
- We await the response and use the task returned by the server (it has the authoritative `id` and `createdAt`)
- If we used `Date.now()` on the frontend like before, the frontend and backend would have different IDs — that causes bugs when trying to delete
- The request flow: form submit → `addTask` → POST to `/api/tasks` → server creates task → response back → update state

---

### Day 10 — DELETE Request to Remove Tasks

**Goal:** Students wire up the Delete button to send a DELETE request to the backend.

#### Concepts to Explain
- DELETE requests identify the resource via the URL, not the body
- The server returns `204 No Content` — there is no JSON to parse
- Optimistic vs confirmed deletion: we wait for the server to confirm before removing from state

#### Files to Update

**`frontend/src/App.jsx`** — update `deleteTask` to call the backend
```jsx
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  setTasks(tasks.filter((t) => t.id !== id));
}
```

#### What to Explain
- Template literals (backticks) to build the URL dynamically: `` `/api/tasks/${id}` ``
- Why we only update state after `await` — we want to confirm the server deleted it first
- What happens if the server returns 404 (task not found): a more robust app would handle this, but we keep it simple here

---

### Day 11 — Data Persistence with JSON File Storage

**Goal:** Students understand why in-memory data is lost on restart and implement file-based persistence.

#### Concepts to Explain
- The problem with in-memory storage: the `tasks` array in `routes/tasks.js` is reset every time the server restarts
- What persistence means: data that survives restarts
- Node.js `fs` module: built-in module for reading and writing files
- Why JSON is a good fit for simple persistence: human-readable, maps directly to JavaScript objects

#### Files to Create

**`backend/data/tasks.json`** — the file that stores tasks
```json
[]
```

#### Files to Update

**`backend/routes/tasks.js`** — replace the in-memory array with `fs` read/write
```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/tasks.json');

function readTasks() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

router.get('/', (req, res) => {
  res.json(readTasks());
});

router.post('/', (req, res) => {
  const { title } = req.body;
  const tasks = readTasks();
  const newTask = { id: Date.now(), title: title.trim(), completed: false, createdAt: new Date().toISOString() };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  writeTasks(tasks);
  res.status(204).send();
});

export default router;
```

#### What to Explain
- `fs.readFileSync` reads the whole file as a string; `JSON.parse` converts it to an array
- `fs.writeFileSync` writes the array back as formatted JSON after every change
- `JSON.stringify(tasks, null, 2)`: the `2` adds indentation so the file is human-readable
- `import.meta.url` + `fileURLToPath`: how to get `__dirname` in ES modules (it doesn't exist by default)
- Restart the server, add a task, restart again — the task is still there

---

### Day 12 — Mark Tasks as Completed (PATCH)

**Goal:** Students add a checkbox to toggle task completion and wire it to a PATCH endpoint.

#### Concepts to Explain
- PATCH: used to partially update a resource (toggle one field) as opposed to replacing the whole thing
- Checkbox in React: a controlled input where `checked` is driven by state
- How state updates flow: click checkbox → `onToggle(id)` → PATCH request → update state with server response

#### Files to Update

**`backend/routes/tasks.js`** — add the PATCH route
```js
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  writeTasks(tasks);
  res.json(task);
});
```

**`frontend/src/components/TaskItem.jsx`** — add checkbox and completed styling
```jsx
function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? 'done' : ''}>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
```

**`frontend/src/components/TaskList.jsx`** — pass `onToggle` down
```jsx
function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) return <p>No tasks yet. Add one above!</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default TaskList;
```

**`frontend/src/App.jsx`** — add `completeTask` handler
```jsx
async function completeTask(id) {
  const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
  const updated = await res.json();
  setTasks(tasks.map((t) => (t.id === id ? updated : t)));
}
```

Add to `App.css`:
```css
.task-item span.done {
  text-decoration: line-through;
  color: #a0aec0;
}
```

#### What to Explain
- `tasks.map((t) => t.id === id ? updated : t)`: replaces one item in the array without mutating the original
- The checkbox `checked` prop must always match the task's `completed` state — this is a controlled input
- Returning the updated task from the server and using it to update state keeps frontend and backend in sync

---

### Day 13 — Refactoring and Code Organization

**Goal:** Students improve the codebase by extracting all API calls into a dedicated module.

#### Concepts to Explain
- Why refactoring: `App.jsx` currently mixes UI logic with data-fetching logic — they are separate concerns
- Separation of concerns: each file should have one clear responsibility
- Named exports vs default exports
- How importing from a module works

#### Files to Create

**`frontend/src/api.js`** — move all fetch calls here
```js
const BASE = '/api/tasks';

export async function getTasks() {
  const res = await fetch(BASE);
  return res.json();
}

export async function createTask(title) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function removeTask(id) {
  await fetch(`${BASE}/${id}`, { method: 'DELETE' });
}

export async function toggleTask(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PATCH' });
  return res.json();
}
```

#### Files to Update

**`frontend/src/App.jsx`** — import from `api.js` and remove raw fetch calls
```jsx
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, removeTask, toggleTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function addTask(title) {
    const newTask = await createTask(title);
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(id) {
    await removeTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  }

  async function completeTask(id) {
    const updated = await toggleTask(id);
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  }

  return (
    <div className="app">
      <h1>Student Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={completeTask} />
    </div>
  );
}

export default App;
```

#### What to Explain
- `App.jsx` is now only responsible for state and rendering — much easier to read
- `api.js` can be reused in any component without duplicating fetch logic
- If the backend URL changes, you only update one file
- This is a real-world pattern used in professional codebases

---

### Day 14 — Introduction to Deployment

**Goal:** Students understand how to make their app accessible on the internet.

#### Concepts to Explain
- The difference between development and production
- Static files: when you run `npm run build`, Vite compiles your React app into plain HTML, CSS, and JS files that any server can serve
- What a hosting platform is and why we need one (our laptop is not a public server)
- Environment variables: how to configure the backend URL without hardcoding it

#### Frontend Deployment (Vercel or Netlify)

1. Run `npm run build` inside `frontend/` — this creates a `dist/` folder
2. Deploy the `dist/` folder to Vercel or Netlify (drag and drop or connect GitHub)
3. Set the API base URL in `api.js` using an environment variable:

```js
const BASE = import.meta.env.VITE_API_URL || '/api/tasks';
```

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend.onrender.com/api/tasks
```

#### Backend Deployment (Render)

1. Push the `backend/` folder to a GitHub repository
2. Create a new Web Service on [render.com](https://render.com), point it to the repo
3. Set the start command to `node server.js`
4. Update the CORS origin in `server.js` to allow only your frontend URL in production

#### What to Explain
- The frontend and backend are deployed separately — they communicate over the internet using the API
- Environment variables keep configuration (like URLs and secrets) out of the source code
- `npm run build` is a one-time compilation step; `npm run dev` is only for local development

---

### Day 15 — Project Presentation and Review

**Goal:** Students demonstrate their finished application and explain how each part works.

#### Concepts to Review

Walk students through the complete data flow of the app:

1. **Browser loads** `http://localhost:5173` → Vite serves `index.html`
2. **React mounts** → `App.jsx` renders, `useEffect` fires
3. **GET /api/tasks** → Vite proxy forwards to Express → `readTasks()` reads `tasks.json` → returns JSON
4. **State updates** → `setTasks(data)` → React re-renders `TaskList` and `TaskItem` components
5. **User adds a task** → `TaskForm` calls `onAdd` → `createTask()` sends POST → Express writes to `tasks.json` → returns new task → state updates
6. **User deletes a task** → `TaskItem` calls `onDelete` → `removeTask()` sends DELETE → Express removes from file → state updates
7. **User completes a task** → checkbox triggers `onToggle` → `toggleTask()` sends PATCH → Express flips `completed` → state updates

#### Student Presentation Checklist
- [ ] Explain what React is and why we used it
- [ ] Show a component and explain what props it receives
- [ ] Explain what `useState` and `useEffect` do
- [ ] Show the Express server and explain what a route does
- [ ] Explain the difference between GET, POST, DELETE, and PATCH
- [ ] Show `tasks.json` and explain how data persistence works
- [ ] Explain what happens when you add, delete, or complete a task (end-to-end)

---

## Key Concepts Summary

| Concept | Where It Appears |
|---|---|
| JSX | All `.jsx` files |
| Props | `TaskList`, `TaskItem`, `TaskForm` |
| useState | `App.jsx`, `TaskForm.jsx` |
| useEffect | `App.jsx` (data fetching) |
| Event handling | `TaskForm.jsx`, `TaskItem.jsx` |
| fetch + async/await | `api.js` |
| Express routing | `routes/tasks.js` |
| Middleware | `server.js` (cors, express.json) |
| REST methods | GET, POST, DELETE, PATCH in `routes/tasks.js` |
| File persistence | `fs` module in `routes/tasks.js` |
| ES Modules | `import`/`export` throughout backend |
| Vite proxy | `vite.config.js` |
