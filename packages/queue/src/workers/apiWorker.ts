import { Worker, Job } from "bullmq";
import { logger } from "@repo/logger";
import { config } from "@repo/config";
import AxiosWrapper from "@repo/axios-wrapper";

const { bullMqOptions, appServer } = config;

const apiClient = new AxiosWrapper({
  baseURL: appServer.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
