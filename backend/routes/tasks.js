import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { getTasks, createTask, toggleTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/',      getTasks);
router.post('/',     createTask);
router.patch('/:id', toggleTask);
router.put('/:id',   updateTask);
router.delete('/:id', deleteTask);

export default router;
