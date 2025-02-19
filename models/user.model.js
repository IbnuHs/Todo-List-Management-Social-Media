import { DataTypes } from "sequelize";
import db from "../config/db.js";

const user = db.define("user", {
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

const syncUser = async () => {
  await user.sync();
};
syncUser();

export default user;
