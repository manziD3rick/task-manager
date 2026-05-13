import Task from '../models/Task.js';

export async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.session.userId }).sort({ createdAt: 1 });
  res.json(tasks);
}

export async function createTask(req, res) {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });                                 
  }
  const task = await new Task({ title: title.trim(), userId: req.session.userId }).save();
  res.status(201).json(task);
}

export async function toggleTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, userId: req.session.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
}

export async function updateTask(req, res) {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = await Task.findOne({ _id: req.params.id, userId: req.session.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.title = title.trim();
  await task.save();
  res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
}

