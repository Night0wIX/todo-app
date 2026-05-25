import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "@/shared/api/client";
import { buildUrl } from "@/shared/libs/url/buildUrl";
import type { QueryParams } from "@/shared/types/query";

export abstract class BaseApiService {
  readonly #http: AxiosInstance;
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#http = apiClient;
    this.#baseUrl = baseUrl;
  }

  protected url(
    path: string,
    params?: Record<string, string | number>,
    query?: QueryParams,
  ): string {
    return buildUrl(this.#baseUrl, path, params, query);
  }

  protected get<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.#http.get<TResponse>(url, config);
  }

  protected post<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.#http.post<TResponse>(url, data, config);
  }

  protected patch<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.#http.patch<TResponse>(url, data, config);
  }

  protected delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.#http.delete<TResponse>(url, config);
  }
}
