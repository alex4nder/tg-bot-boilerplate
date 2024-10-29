import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "@repo/config";
import { join } from "node:path";

dotenvConfig({ path: "../../.env" });

const { typeOrmOptions } = config;

const dataSourceConfig: DataSourceOptions = {
  ...(typeOrmOptions as DataSourceOptions),
  entities: [join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [join(__dirname, "./migrations/**/*.{js,ts}")],
  // migrationsTableName: "migrations",
};

export const AppDataSource = new DataSource(dataSourceConfig);
