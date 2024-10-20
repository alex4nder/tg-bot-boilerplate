export interface IConfig {
  appName: string;
  appServer: {
    port?: number;
  };
  telegramBot: {
    token: string;
  };
}
