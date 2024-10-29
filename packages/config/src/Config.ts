import { IConfig } from "./configuration.interface";
import * as environments from "./environments";

export class Config {
  public config: IConfig;

  constructor() {
    const config: IConfig = environments.fallback;
    const env = process.env["NODE_ENV"] ?? "development";

    if (Object.keys(environments).includes(env)) {
      this.config = {
        ...config,
        ...environments[env as keyof typeof environments],
      };
    } else {
      this.config = config;
    }
  }
}
