import express from "express";
import logger from "morgan";
import cors from "cors";
import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

const listRoutes = () => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push(
        `${Object.keys(middleware.route.methods)} - ${middleware.route.path}`
      );
    }
  });
  console.log(routes);
  return routes;
};
listRoutes();
export default app;
