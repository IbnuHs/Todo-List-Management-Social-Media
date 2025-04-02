import {
  changeStatus,
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodo,
  getCompleteTask,
  getTodo,
} from "../controller/todo.controller.js";
import { Router } from "express";
import verifyToken from "../middleware/jwt.middleware.js";

const todoRoute = Router();

todoRoute.get("/api/todo/complete", getCompleteTask);
todoRoute.post("/api/todo/create", verifyToken, createTodo);
todoRoute.get("/api/todo", verifyToken, getAllTodo);
todoRoute.get("/api/todo/:id", verifyToken, getTodo);
todoRoute.patch("/api/todo/updateStatus", verifyToken, changeStatus);
todoRoute.patch("/api/todo/:id", verifyToken, editTodo);
todoRoute.delete("/api/todo/:id", verifyToken, deleteTodo);

export default todoRoute;
