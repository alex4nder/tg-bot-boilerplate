import { IConfig } from "../configuration.interface";
import { RedisOptions } from "ioredis";

const appCode = "tg-bot-starter";

const redisOptions: RedisOptions = {
  host: "localhost",
  port: 6379,
};

const appServerPort = 3001;

export const fallback: IConfig = {
  appName: "TG Bot Starter",
  appServer: {
    port: appServerPort,
    baseUrl: `http://localhost:${appServerPort}`,
  },
  appClient: {
    baseUrl: "http://127.0.0.1:8080",
  },
  telegramBot: {
    token: process.env["TG_BOT_TOKEN"] as string,
    client: {
      environment: "test",
    },
  },
  typeOrmOptions: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "telegram_bot_starter_user",
    password: "telegram_bot_starter_password",
    database: "telegrambotstarterdb",
    schema: "dev",
    synchronize: false,
  },
  redisOptions: {
    ...redisOptions,
    keyPrefix: `${appCode}:`,
  },
  bullMqOptions: redisOptions,
};
