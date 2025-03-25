import { Router } from "express";
import { addPlatform, getPlatform } from "../controller/platform.controller.js";
import verifyToken from "../middleware/jwt.middleware.js";

const platformRoute = Router();
platformRoute.post("/api/platform", verifyToken, addPlatform);
platformRoute.get("/api/platform", getPlatform);

export default platformRoute;
