import "reflect-metadata";
import { AppDataSource } from "@repo/db";
import { config } from "@repo/config";
import { logger } from "@repo/logger";
import app from "./app";

const { appServer } = config;

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected");
    app.listen(appServer.port, () => {
      logger.info(`Example of server running on port ${appServer.port}`);
    });
  })
  .catch((error) => {
    logger.error("Database connection error:", error);
  });
