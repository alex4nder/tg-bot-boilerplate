import { IConfig } from "../configuration.interface";

export const fallback: IConfig = {
  appName: "tg-bot-boilerplate",
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
    username: "postgres",
    password: "postgres",
    database: "telegramdb",
    schema: "dev",
    synchronize: false,
  },
};
