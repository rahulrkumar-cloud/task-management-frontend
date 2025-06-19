import { useState, useEffect } from "react";
import { TaskDto, Task, TaskStatus } from "../types/Task";

interface Props {
  onSubmit: (task: TaskDto) => void;
  selectedTask?: Task | null;
  onSuccess?: (message: string) => void;
}

export default function TaskForm({ onSubmit, selectedTask, onSuccess }: Props) {
  const [formData, setFormData] = useState<TaskDto>({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const statusIndexToText: Record<number, TaskStatus> = {
    0: "Pending",
    1: "InProgress",
    2: "Completed",
  };

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        dueDate: selectedTask.dueDate.slice(0, 10),
        status:
          typeof selectedTask.status === "number"
            ? statusIndexToText[selectedTask.status]
            : selectedTask.status,
      });
    }
  }, [selectedTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear corresponding error when user types
    if (["title", "description", "dueDate"].includes(e.target.name)) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { title: "", description: "", dueDate: "" };

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required.";
      isValid = false;
    }

    if (!formData.dueDate.trim()) {
      errors.dueDate = "Due date is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    });

    if (onSuccess) {
      onSuccess(
        selectedTask
          ? "Task updated successfully!"
          : "Task created successfully!"
      );
    }

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    });

    setFormErrors({ title: "", description: "", dueDate: "" });
  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <h2>{selectedTask ? "Edit Task" : "Create New Task"}</h2>

        <div className="form-group">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={formErrors.title ? "error-input" : ""}
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div className="form-group">
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={formErrors.title ? "error-input" : ""}
          />
          {formErrors.description && (
            <p className="error">{formErrors.description}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={formErrors.dueDate ? "error-input" : ""}
            min={new Date().toISOString().split("T")[0]}
          />
          {formErrors.dueDate && <p className="error">{formErrors.dueDate}</p>}
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={formErrors.title ? "error-input" : ""}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">{selectedTask ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
