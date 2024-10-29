import { config as dotenvConfig } from "dotenv";
import { join } from "node:path";

const cwd = process.env["PROJECT_CWD"];
if (!cwd) throw new Error("Couldn't find workspace root path");
dotenvConfig({ path: join(cwd, ".env") });

import { Config } from "./Config";
import { IConfig } from "./configuration.interface";

export const config: IConfig = new Config().config;
