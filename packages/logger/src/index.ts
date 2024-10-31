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
  maskOptions: {
    maskLabel: "...Masked",
    fields: ["token"],
  },
})
  .withConsole()
  .captureConsole();

const { logger } = logVault;

export { logger, logVault, LogOptions };
