import express from "express";
import userRoute from "./routes/user.routes.js";
import dotenv from "dotenv";
import todoRoute from "./routes/todo.routes.js";
import swaggerDocs from "./config/swagger.js";
import swaggerUI from "swagger-ui-express";
import platformRoute from "./routes/platform.routes.js";
import "./models/association.js";
import cors from "cors";

const option = {
  origin: ["http://localhost:5173"],
};
const app = express();
const port = 3000;
app.use(express.json());
app.use(userRoute);
app.use(todoRoute);
app.use(platformRoute);
app.use(cors(option));
dotenv.config();
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// console.log(swaggerDocs);

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
