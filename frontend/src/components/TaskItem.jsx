import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { deleteTask, completeTask, editTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(task.title);

  async function handleSave() {
    if (!draft.trim()) return;
    await editTask(task._id, draft.trim());
    setEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => completeTask(task._id)}
        className="w-4 h-4 accent-green-500 cursor-pointer"
      />

      {editing ? (
        <>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 border border-blue-400 rounded-lg px-3 py-1 text-sm focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
