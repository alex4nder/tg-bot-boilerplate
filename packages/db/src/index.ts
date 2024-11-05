import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "@repo/config";
import { join } from "node:path";
import * as entities from "./entity";

const { typeOrmOptions } = config;

const dataSourceConfig: DataSourceOptions = {
  ...(typeOrmOptions as DataSourceOptions),
  entities,
  migrations: [join(__dirname, "./migration/**/*.{js,ts}")],
};

export const AppDataSource = new DataSource(dataSourceConfig);

export * from "./entity";
