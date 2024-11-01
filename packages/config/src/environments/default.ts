import { IConfig } from "../configuration.interface";
import { RedisOptions } from "ioredis";

const appCode = "tg-bot-starter";

const redisOptions: RedisOptions = {
  host: "localhost",
  port: 6379,
};

export const fallback: IConfig = {
  appName: "TG Bot Starter",
  appServer: {
    port: 3001,
  },
  telegramBot: {
    token: process.env["TG_BOT_TOKEN"] as string,
  },
  typeOrmOptions: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "telegram_boilerplate_user",
    password: "telegram_boilerplate_password",
    database: "telegramdb",
    schema: "dev",
    synchronize: false,
  },
  redisOptions: {
    ...redisOptions,
    keyPrefix: `${appCode}:`,
  },
  bullMqOptions: redisOptions,
};
