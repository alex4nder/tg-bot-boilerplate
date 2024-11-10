import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosInterceptor } from "./interceptors";

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

    this.setInterceptors();
  }

  public request<T = any>(options: RequestOptions): Promise<AxiosResponse<T>> {
    return this.instance.request({
      method: options.method,
      url: options.url,
      data: options.data,
      ...options.config,
    });
  }

  private setInterceptors(): this {
    new AxiosInterceptor(this.instance);

    return this;
  }
}
