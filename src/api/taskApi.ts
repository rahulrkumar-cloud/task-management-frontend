import axios from "axios";
import { Task, TaskDto } from "../types/Task";

const BASE_URL = "https://localhost:44303/tasks"; // Adjust for actual deployment

export const getTasks = () => axios.get<Task[]>(BASE_URL);
export const createTask = (task: TaskDto) => axios.post(BASE_URL, task);
export const updateTask = (id: number, task: TaskDto) => axios.put(`${BASE_URL}/${id}`, task);
export const deleteTask = (id: number) => axios.delete(`${BASE_URL}/${id}`);
