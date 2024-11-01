import { IConfig } from "../configuration.interface";

const appName = "tg-bot-boilerplate";

export const fallback: IConfig = {
  appName,
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
    host: "localhost",
    port: 6379,
  },
};
