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
    username: "telegram_boilerplate_user",
    password: "telegram_boilerplate_password",
    database: "telegramdb",
    schema: "dev",
    synchronize: false,
  },
};
