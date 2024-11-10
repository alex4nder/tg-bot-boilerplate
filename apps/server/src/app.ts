import express, { Application } from "express";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(express.json());

app.use("/users", userRoutes);

export default app;
