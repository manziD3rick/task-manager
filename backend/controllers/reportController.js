import Task from '../models/Task.js';

export async function getStats(req, res) {
  const tasks = await Task.find({ userId: req.session.userId });
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  res.json({ total, completed, pending, completionRate });
}

export async function downloadCSV(req, res) {
  const tasks = await Task.find({ userId: req.session.userId }).sort({ createdAt: 1 });
  const header = 'Title,Completed,Created At\n';
  const rows = tasks
    .map((t) => `"${t.title.replace(/"/g, '""')}",${t.completed},${t.createdAt.toISOString()}`)
    .join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="tasks.csv"');
  res.send(header + rows);
}
