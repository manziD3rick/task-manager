import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-12">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
