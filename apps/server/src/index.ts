import "reflect-metadata";
import { AppDataSource } from "@repo/db";
import { config } from "@repo/config";
import app from "./app";

const { appServer } = config;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(appServer.port, () => {
      console.log(`Example of server running on port ${appServer.port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
