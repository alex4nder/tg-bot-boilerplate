import { I18n } from "@grammyjs/i18n";
import { cwd } from "process";
import { resolve } from "path";

export default new I18n({
  directory: resolve(cwd(), "locales"),
  defaultLocale: "en",
  useSession: true,
});
