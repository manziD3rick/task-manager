import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import reportRouter from './routes/report.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: 'task-manager-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/task-manager' }),
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use('/api/auth',   authRouter);
app.use('/api/tasks',  tasksRouter);
app.use('/api/report', reportRouter);

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
);
