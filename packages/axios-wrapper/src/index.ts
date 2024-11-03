import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { logger } from "@repo/logger";

interface RequestOptions {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

export default class AxiosWrapper {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

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

  public request<T = any>(options: RequestOptions): Promise<AxiosResponse<T>> {
    return this.instance.request({
      method: options.method,
      url: options.url,
      data: options.data,
      ...options.config,
    });
  }
}
