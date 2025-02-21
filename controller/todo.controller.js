import todo from "../models/todo-model.js";
import * as crypto from "crypto";
import user from "../models/user.model.js";

const createTodo = async (req, res) => {
  try {
    const { platform, titleContent, dueOn } = req.body;
    const userId = req.userId;
    if (!platform || !titleContent || !dueOn) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const users = await user.findOne({
      where: {
        id: userId,
      },
    });
    console.log(users);
    if (!users)
      return res.status(401).json({
        status: 401,
        message: "Invalid User",
      });

    const id = crypto.randomUUID();
    await todo.create({
      id: id,
      platform: platform,
      titleContent: titleContent,
      dueOn: dueOn,
      userId: users.id,
    });

    return res.status(201).json({
      status: 200,
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
    const userId = req.userId;
    if (!userId)
      return res.status(400).json({
        status: 400,
        message: "Please Input User Id",
      });
    const users = await user.findOne({
      where: {
        id: userId,
      },
    });
    if (!users)
      return res.status(401).json({
        status: 401,
        message: "Invalid User",
      });

    const todos = await todo.findAll({
      where: {
        userId: users.id,
      },
    });

    if (!todos)
      return res.status(200).json({
        status: 200,
        message: "Not Task Been Created",
      });
    return res.status(200).json({
      status: 200,
      message: "Todos Successfully Retrieved",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id)
      return res.status(400).json({
        status: 400,
        message: "Invalid Id",
      });
    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: 404,
        messagge: "Todos Not Found",
      });

    return res.status(200).json({
      status: 200,
      message: "Todos Successfully Retrieved",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 400,
        message: "Invalid Id",
      });
    console.log(status === "PENDING");
    if (!["COMPLETE", "PENDING", "OVERDUE"].includes(status))
      return res.status(400).json({
        status: 400,
        message: "Please Input valid Status, PENDING OR COMPLETE OR OVERDUE",
      });
    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: 404,
        message: "Todos Not Found",
      });
    await todos.update({
      status: status,
    });
    return res.status(200).json({
      status: 200,
      message: "Todos Update Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 404,
        message: "Todos Not Found, Invalid Id",
      });
    await todos.update({
      platform: platform,
      titleContent: titleContent,
      dueOn: dueOn,
    });

    return res.status(200).json({
      status: 200,
      message: "Success Update Todo",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
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
        status: 400,
        message: "Please input todos Id",
      });

    const todos = await todo.findOne({
      where: {
        id: id,
      },
    });
    if (!todos)
      return res.status(404).json({
        status: 404,
        message: "Todos Not Found",
      });

    await todo.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Todos Delete Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Erro",
      detail: error.message,
    });
  }
};

export { createTodo, getAllTodo, getTodo, changeStatus, deleteTodo, editTodo };
