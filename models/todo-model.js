import { DataTypes } from "sequelize";
import db from "../config/db.js";
import user from "./user.model.js";

const todo = db.define("todo-socmed", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleContent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM({
      values: ["PENDING", "COMPLETE", "OVERDUE"],
    }),
    allowNull: false,
    defaultValue: "PENDING",
  },
  dueOn: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: user,
      key: "id",
    },
  },
});

const syncTodo = async () => {
  await todo.sync();
};
syncTodo();

export default todo;
