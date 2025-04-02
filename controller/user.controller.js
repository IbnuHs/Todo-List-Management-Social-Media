import user from "../models/user.model.js";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        status: 400,
        message: "Name or Email or Password Can't Be Empty",
      });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email))
      return res.status(400).json({
        status: 400,
        message: "Email Not valid",
      });
    if (password.length < 8)
      return res.status(400).json({
        status: 400,
        return: "password cannot be less than 8 characters",
      });
    const users = await user.findOne({
      where: {
        email: email,
      },
    });
    if (users)
      return res.status(401).json({
        status: 401,
        message: "Email Already Exist",
      });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await user.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: 201,
      message: "User Created Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({
        status: 401,
        message: "email and password can't be empty",
      });
    const users = await user.findOne({
      where: {
        email: email,
      },
    });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email))
      return res.status(400).json({
        status: 400,
        message: "Email Not valid",
      });
    if (!users)
      return res.status(401).json({
        status: 401,
        message: "Email Not Registered",
      });
    const match = await bcrypt.compare(password, users.password);
    if (!match)
      return res.status(401).json({
        status: 401,
        message: "Password Incorrect",
      });
    const token = jwt.sign(
      {
        name: users.name,
        email: users.email,
        userId: users.id,
      },
      process.env.ACCESS_TOKEN
    );

    return res.status(200).json({
      status: 200,
      message: "Login Success",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await user.findAll({
      where: {
        roles: "AUTHORS",
      },
    });

    return res.status(200).json({
      status: 200,
      data: authors,
    });
  } catch (error) {
    return re.status(500).json({
      status: 500,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export { register, login, getAuthors };
