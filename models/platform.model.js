import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Platform = db.define("platform", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const platformSync = async () => {
  await Platform.sync();
};
platformSync();
export default Platform;
