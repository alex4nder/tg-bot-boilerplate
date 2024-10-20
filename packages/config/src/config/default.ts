import { IConfig } from "../config.types";

export const defaultConfig: IConfig = {
  appName: "tg-bot-boilerplate",
  appServer: {
    port: 3001,
  },
  telegramBot: {
    token: process.env["TG_BOT_TOKEN"] as string,
  },
};
