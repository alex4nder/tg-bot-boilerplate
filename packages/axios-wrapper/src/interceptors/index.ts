import { AxiosError, AxiosInstance } from "axios";
import { logger } from "@repo/logger";

export class AxiosInterceptor {
  private instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this.instance = _instance;

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        logger.error("Request error:", { message: error.message });
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
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

        logger.error(
          `Error response from "${error.config?.url}"`,
          errorDetails,
        );

        return Promise.reject(errorDetails);
      },
    );
  }
}
