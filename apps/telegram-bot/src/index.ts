import { Bot } from "grammy";
import { config } from "@repo/config";
import { logger } from "@repo/logger";
import { apiQueue } from "@repo/queue";

const { telegramBot } = config;

const bot = new Bot(telegramBot.token || "");

bot.command("start", async (ctx) => {
  logger.info("Welcome! Up and running.");

  const chatId = ctx.msg.chat.id;
  const userId = ctx.msg.from?.id;
  const userName = [ctx.msg.from?.first_name, ctx.msg.from?.last_name]
    .filter((name) => {
      return !!name;
    })
    .join(" ");

  await apiQueue.add("callEndpoint", {
    endpoint: "/users",
    method: "POST",
    payload: { userId, chatId, userName },
  });

  ctx.reply("Welcome! Up and running.");
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
