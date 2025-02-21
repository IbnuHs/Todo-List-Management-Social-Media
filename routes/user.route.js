import { login, register } from "../controller/user.controller.js";
import { Router } from "express";

const userRoute = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user baru
 *     description: Mendaftarkan user ke sistem
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Created Successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: User Created Successfully
 *       400:
 *         description: Bad Request - Validation Error
 *         content:
 *           application/json:
 *             examples:
 *               EmptyFields:
 *                 value:
 *                   status: 400
 *                   message: Name, Email, or Password Can't Be Empty
 *               InvalidEmail:
 *                 value:
 *                   status: 400
 *                   message: Email format is not valid
 *               ShortPassword:
 *                 value:
 *                   status: 400
 *                   message: Password must be at least 8 characters long
 *       409:
 *         description: Email Already Exists
 *         content:
 *           application/json:
 *             example:
 *               status: 409
 *               message: Email Already Exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     description: Login user ke aplikasi
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Login Successful
 *       400:
 *         description: Bad Request - Validation Error
 *         content:
 *           application/json:
 *             examples:
 *               EmptyFields:
 *                 value:
 *                   status: 400
 *                   message: Name, Email, or Password Can't Be Empty
 *               InvalidEmail:
 *                 value:
 *                   status: 400
 *                   message: Email format is not valid
 *       401:
 *         description: Authentication Error
 *         content:
 *           application/json:
 *             examples:
 *               EmailNotRegistered:
 *                 value:
 *                   status: 401
 *                   message: Email Not Registered
 *               IncorrectPassword:
 *                 value:
 *                   status: 401
 *                   message: Password Incorrect
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */
userRoute.post("/api/auth/register", register);
userRoute.post("/api/auth/login", login);

export default userRoute;
