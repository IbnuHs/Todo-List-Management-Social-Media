import { login, register } from "../controller/user.controller.js";
import { Router } from "express";

const userRoute = Router();
userRoute.post("/api/auth/register", register);
userRoute.post("/api/auth/login", login);

export default userRoute;
