import express from "express";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import todoRoute from "./routes/todo.route.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(userRoute);
app.use(todoRoute);
dotenv.config();
const initapp = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

initapp();
