import { RedisOptions } from "ioredis";
import { DataSourceOptions } from "typeorm";

type BullMqOptions = Omit<RedisOptions, "keyPrefix">;

export interface IConfig {
  appName: string;
  appServer: {
    port: number;
    baseUrl: string;
  };
  telegramBot: {
    token: string;
  };
  typeOrmOptions: DataSourceOptions;
  redisOptions: RedisOptions;
  bullMqOptions: BullMqOptions;
}
