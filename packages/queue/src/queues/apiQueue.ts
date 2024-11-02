import { Queue } from "bullmq";
import { RedisOptions } from "ioredis";
import { config } from "@repo/config";

const { bullMqOptions } = config;
const redisOptions: RedisOptions = bullMqOptions;

export const apiQueue = new Queue("apiQueue", {
  connection: redisOptions,
  defaultJobOptions: { removeOnComplete: true, removeOnFail: true },
});
