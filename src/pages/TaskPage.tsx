import { useEffect, useState } from "react";
import { Task, TaskDto } from "../types/Task";
import * as taskApi from "../api/taskApi";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  const loadTasks = async () => {
    const res = await taskApi.getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateOrUpdate = async (task: TaskDto) => {
    if (editingTask) {
      await taskApi.updateTask(editingTask.taskId, task);
    } else {
      await taskApi.createTask(task);
    }
    setEditingTask(null);
    await loadTasks();
  };

const handleDelete = async (id: number) => {
  try {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    await taskApi.deleteTask(id);
    await loadTasks();

    // ✅ Show success dialog
    setDialogMessage("Task deleted successfully!");
  } catch (error) {
    console.error("Failed to delete task:", error);
    setDialogMessage("An error occurred while deleting the task.");
  }
};


  return (
    <div className="task-page">
      <h1 className="page-title">Task Management</h1>
      <div className="task-layout">
        <TaskForm
          onSubmit={handleCreateOrUpdate}
          selectedTask={editingTask}
          onSuccess={setDialogMessage}
        />
        <div className="scroll-area">
          <TaskTable
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {dialogMessage && (
        <ConfirmDialog
          message={dialogMessage}
          onClose={() => setDialogMessage(null)}
        />
      )}
    </div>
  );
}
