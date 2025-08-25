import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const { axios, user, setUser, navigate } = useAppContext();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/task");
      if (res.data.success) setTasks(res.data.tasks);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.data.success) {
        toast.success("Logged out successfully!");
        setUser(null);
        navigate("/login");
      }
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      {/* Topbar */}
      <div className="sticky top-0 z-50 flex justify-between items-center bg-slate-900 p-4 text-white">
        <h2 className="text-xl font-semibold">Hello, {user?.name}</h2>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-800 rounded-md"
          >
            + Create Task
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        fetchTasks={fetchTasks}
        task={editingTask}
      />

      {/* Task List */}
      <div className="flex flex-col items-center p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
};

export default Home;
