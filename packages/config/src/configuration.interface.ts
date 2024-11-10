import { RedisOptions } from "ioredis";
import { DataSourceOptions } from "typeorm";
import { ApiClientOptions } from "grammy";

type BullMqOptions = Omit<RedisOptions, "keyPrefix">;

export interface IConfig {
  appName: string;
  appServer: {
    port: number;
    baseUrl: string;
  };
  appClient: {
    baseUrl: string;
  };
  telegramBot: {
    token: string;
    client: ApiClientOptions;
  };
  typeOrmOptions: DataSourceOptions;
  redisOptions: RedisOptions;
  bullMqOptions: BullMqOptions;
}
