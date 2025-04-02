import { DataTypes } from "sequelize";
import db from "../config/db.js";
import user from "./user.model.js";
import Platform from "./platform.model.js";

const todo = db.define(
  "todo-socmed",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    platform: {
      type: DataTypes.INTEGER,
      references: {
        model: Platform,
        key: "id",
      },
      allowNull: false,
    },
    titleContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("NOT STARTED", "COMPLETE", "ON PROCESS"),
      allowNull: false,
      defaultValue: "NOT STARTED",
    },
    dueOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: "id",
      },
    },
    authorsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: "id",
      },
    },

    timeUpload: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "todo-socmeds",
    underscored: true,
  }
);

const syncTodo = async () => {
  await todo.sync({ alter: true });
};
syncTodo();

export default todo;
