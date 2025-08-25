import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const TaskForm = ({ isOpen, onClose, fetchTasks, task }) => {
  const { axios } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "pending",
  });

  // Fill data when editing
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        priority: task.priority || "low",
        status: task.status || "pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (task) {
        res = await axios.put(`/api/task/${task._id}`, formData);
      } else {
        res = await axios.post("/api/task", formData);
      }

      if (res.data.success) {
        toast.success(task ? "Task updated!" : "Task created!");
        fetchTasks();
        onClose();
      }
    } catch {
      toast.error("Failed to save task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-lg w-full max-w-md text-white">
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="px-3 py-2 bg-[#333A5C] rounded-md outline-none"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-3 py-2 bg-[#333A5C] rounded-md outline-none"
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="px-3 py-2 bg-[#333A5C] rounded-md outline-none"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="px-3 py-2 bg-[#333A5C] rounded-md outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 bg-[#333A5C] rounded-md outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
            >
              {task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
