import { Sequelize } from "sequelize";
import * as mysql2 from "mysql2";

const db = new Sequelize("todo-socmed", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
});

try {
  db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error.message);
}

export default db;
