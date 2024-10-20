import { Bot } from "grammy";
import { config } from "@repo/config";
import { logger } from "@repo/logger";

const { telegramBot } = config;

const bot = new Bot(telegramBot.token || "");

bot.command("start", (ctx) => {
  logger.info("Welcome! Up and running.");
  ctx.reply("Welcome! Up and running.");
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
