import todo from "../models/todo-model.js";
import * as crypto from "crypto";
import user from "../models/user.model.js";
import Platform from "../models/platform.model.js";

const createTodo = async (req, res) => {
  try {
    const { platform, titleContent, dueOn, authors } = req.body;
    const userId = req.userId;
    console.log(userId);
    if (!platform || !titleContent || !dueOn || !authors) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const users = await user.findOne({
      where: {
        id: userId,
      },
    });
    const author = await user.findOne({
      where: {
        id: authors,
      },
    });

    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }
    if (!users)
      return res.status(401).json({
        status: "error",
        message: "Invalid User",
      });
    const id = crypto.randomUUID();
    await todo.create({
      id: id,
      platform: platform,
      titleContent: titleContent,
      dueOn: dueOn,
      authorsId: authors,
      userId: users.id,
    });

    return res.status(201).json({
      status: "success",
      message: "Todo Successfully Created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const todos = await todo.findAll({
      where: {
        status: "NOT STARTED",
      },
      include: [
        {
          model: Platform,
          as: "platformDetails",
        },
        {
          model: user,
          as: "author",
        },
      ],
    });
    return res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

const getTodo = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Invalid Id",
      });
    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: "error",
        messagge: "Todos Not Found",
      });

    return res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

const getCompleteTask = async (req, res) => {
  try {
    const task = await todo.findAll({
      where: {
        status: "COMPLETE",
      },
    });
    const complete = await todo.findAll();
    console.log(complete);
    return res.status(200).json({
      status: 200,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      status: 200,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(status);
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Invalid Id",
      });
    console.log(status === "PENDING");
    if (!["COMPLETE", "PENDING", "OVERDUE"].includes(status))
      return res.status(400).json({
        status: "error",
        message: "Please Input valid Status, PENDING OR COMPLETE OR OVERDUE",
      });
    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: "error",
        message: "Todos Not Found",
      });
    await todos.update({
      status: status,
    });
    return res.status(200).json({
      status: "success",
      message: "Todos Update Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const editTodo = async (req, res) => {
  try {
    const { id, platform, titleContent, dueOn } = req.body;
    if (!id || !platform || !titleContent || !dueOn) {
      return res.status(400).json({
        status: 400,
        message: "Please Fill id, platform, titleContent, dueOn",
      });
    }
    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: "error",
        message: "Todos Not Found, Invalid Id",
      });
    await todos.update({
      platform: platform,
      titleContent: titleContent,
      dueOn: dueOn,
    });

    return res.status(200).json({
      status: "success",
      message: "Success Update Todo",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Please input todos Id",
      });

    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: "error",
        message: "Todos Not Found",
      });

    await todo.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Todos Delete Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Erro",
      detail: error.message,
    });
  }
};

export {
  createTodo,
  getAllTodo,
  getTodo,
  changeStatus,
  deleteTodo,
  editTodo,
  getCompleteTask,
};
