import type { QueryPrimitive } from "@/shared/types/query";

export const serializeValue = (value: QueryPrimitive) => {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
    case "boolean":
      return value.toString();
    default:
      throw new Error(
        `[serializeValue] Unsupported query param type: ${typeof value}`,
      );
  }
};
