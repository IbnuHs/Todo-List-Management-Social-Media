import { DataTypes } from "sequelize";
import db from "../config/db.js";

const user = db.define("user", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
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
  roles: {
    type: DataTypes.ENUM("AUTHORS", "ADMIN"),
    allowNull: false,
    defaultValue: "AUTHORS",
  },
});

// const syncUser = async () => {
//   await user.sync({ FORCE: true });
// };
// syncUser();

export default user;
