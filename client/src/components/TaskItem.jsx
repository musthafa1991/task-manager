import { useState } from "react";
import TaskForm from "./TaskForm";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const TaskItem = ({ task, fetchTasks }) => {
  const { axios } = useAppContext();
  const [openEdit, setOpenEdit] = useState(false);

  const deleteTask = async () => {
    try {
      const res = await axios.delete(`/api/task/${task._id}`);
      if (res.data.success) {
        toast.success("Task deleted!");
        fetchTasks();
      }
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="flex justify-between items-start bg-slate-900 p-4 rounded-lg text-white">
      <div className="flex-1">
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-300">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="text-xs text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        {task.priority && (
          <p className="text-xs text-gray-400">Priority: {task.priority}</p>
        )}
        {task.status && (
          <p className="text-xs text-gray-400">Status: {task.status}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-3">
        <button
          onClick={() => setOpenEdit(true)}
          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-800 rounded-md text-sm"
        >
          Edit
        </button>
        <button
          onClick={deleteTask}
          className="px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md text-sm"
        >
          Delete
        </button>
      </div>

      {/* Edit Popup */}
      <TaskForm
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        fetchTasks={fetchTasks}
        task={task}
      />
    </div>
  );
};

export default TaskItem;
