import { applyPathParams } from "@/shared/libs/url/applyPathParams";
import { serializeQueryParams } from "@/shared/libs/url/serializeQueryParams";
import type { QueryParams } from "@/shared/types/query";

export const buildUrl = (
  baseUrl: string,
  path: string,
  params?: Record<string, string | number>,
  query?: QueryParams,
) => {
  const resolvedPath = params ? applyPathParams(path, params) : path;
  const queryString = query ? serializeQueryParams(query) : "";

  return `${baseUrl}${resolvedPath}${queryString ? `?${queryString}` : ""}`;
};
