import { Worker, Job } from "bullmq";
import { logger } from "@repo/logger";
import { config } from "@repo/config";
import { apiClient } from "../api/apiRequest";

const { bullMqOptions } = config;

const apiWorker = new Worker(
  "apiQueue",
  async (job: Job) => {
    if (job.name === "callEndpoint") {
      const { endpoint, method, payload } = job.data;

      try {
        await apiClient.request({
          method,
          url: endpoint,
          data: payload,
        });
      } catch (error) {}
    }
  },
  { connection: bullMqOptions },
);

apiWorker.on("completed", (job: Job) => {
  logger.info(`Job ${job.id} completed successfully`);
});

apiWorker.on("failed", (job: Job | undefined) => {
  logger.error(`Job ${job?.id} failed with error`);
});
