export interface IConfig {
  appName: string;
  appServer: {
    port?: number;
  };
  telegramBot: {
    token: string;
  };
  typeOrmOptions: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    schema: string;
    synchronize: boolean;
  };
}
