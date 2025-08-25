import TaskItem from "./TaskItem";

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <div className="w-full sm:w-1/2 space-y-3">
      {tasks.length === 0 ? (
        <p className="text-center text-white">No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
        ))
      )}
    </div>
  );
};

export default TaskList;
