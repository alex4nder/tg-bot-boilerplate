import axios, { AxiosError, AxiosInstance } from "axios";
import { logger } from "@repo/logger";
import { config } from "@repo/config";

const { appServer } = config;

export const apiClient: AxiosInstance = axios.create({
  baseURL: appServer.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    logger.info(
      `Sending ${config.method?.toUpperCase()} request to ${config.url}`,
    );
    return config;
  },
  (error) => {
    logger.error("Request error:", { message: error.message });
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    logger.info(`Received response from "${response.config.url}"`, {
      status: response.status,
    });
    return response;
  },
  (error: AxiosError) => {
    const errorDetails = {
      status: error.response?.status || 500,
      message: error.message,
      details: error.response?.data,
      stack: error.stack,
    };

    logger.error(`Error response from "${error.config?.url}"`, errorDetails);

    return Promise.reject(errorDetails);
  },
);
