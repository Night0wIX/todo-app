import { serializeValue } from "@/shared/libs/url/serializeValue";
import type { QueryParams } from "@/shared/types/query";

export const serializeQueryParams = (query: QueryParams) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(`${key}[]`, serializeValue(item));
      }
    } else {
      params.set(key, serializeValue(value));
    }
  }

  return params.toString();
};
