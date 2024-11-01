import { RedisOptions } from "ioredis";
import { DataSourceOptions } from "typeorm";

export interface IConfig {
  appName: string;
  appServer: {
    port?: number;
  };
  telegramBot: {
    token: string;
  };
  typeOrmOptions: DataSourceOptions;
  redisOptions: RedisOptions;
}
