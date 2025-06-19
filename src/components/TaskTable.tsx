import { Task, TaskStatus } from "../types/Task";
import { format } from "date-fns";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const statusIndexToText: Record<number, TaskStatus> = {
  0: "Pending",
  1: "InProgress",
  2: "Completed",
};

export default function TaskTable({ tasks, onEdit, onDelete }: Props) {
  return (
    <div className="table-wrapper">
      <h2 className="table-title">Task List</h2>
      <div className="scrollable-table">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-tasks">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{format(new Date(task.dueDate), "yyyy-MM-dd")}</td>
                  <td>
                    {typeof task.status === "number"
                      ? statusIndexToText[task.status]
                      : task.status}
                  </td>
                  <td className="action-buttons">
                    <button className="edit" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => onDelete(task.taskId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
