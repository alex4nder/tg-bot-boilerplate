import { LogVault, LogOptions } from "log-vault";
import { config } from "@repo/config";

const logVault = new LogVault({
  projectName: config.appName,
  truncateOptions: {
    depth: 12,
    stringLength: 2048,
    arrayLength: 12,
    replaceWith: "...[Truncated]",
  },
})
  .withConsole()
  .captureConsole();

const { logger } = logVault;

export { logger, logVault, LogOptions };
