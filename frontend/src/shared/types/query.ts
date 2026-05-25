export type QueryPrimitive = string | number | boolean;

export type QueryParams = Record<
  string,
  QueryPrimitive | QueryPrimitive[] | null | undefined
>;
