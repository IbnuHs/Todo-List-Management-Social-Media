import {
  changeStatus,
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
} from "../controller/todo.controller.js";
import { Router } from "express";
import verifyToken from "../middleware/jwt.middleware.js";

const todoRoute = Router();
todoRoute.post("/api/todo/create", verifyToken, createTodo);
todoRoute.get("/api/todo/user/:userId", getAllTodo);
todoRoute.get("/api/todo/:id", getTodo);
todoRoute.patch("/api/todo/updateStatus", changeStatus);
todoRoute.delete("/api/todo/:id", deleteTodo);

export default todoRoute;
