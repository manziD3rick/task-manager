import { createContext, useContext, useState, useEffect } from 'react';
import { getTasks, createTask, removeTask, toggleTask, updateTask } from '../api';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getTasks().then(setTasks);
    } else {
      setTasks([]);
    }
  }, [user]);

  async function addTask(title) {
    const task = await createTask(title);
    setTasks((prev) => [...prev, task]);
  }

  async function deleteTask(id) {
    await removeTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  async function completeTask(id) {
    const updated = await toggleTask(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function editTask(id, newTitle) {
    const updated = await updateTask(id, newTitle);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, completeTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
