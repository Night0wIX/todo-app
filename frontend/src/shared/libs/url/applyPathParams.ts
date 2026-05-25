export const applyPathParams = (
  template: string,
  params: Record<string, string | number>,
) => {
  return template
    .split("/")
    .map((segment) => {
      if (!segment.startsWith(":")) {
        return segment;
      }

      const key = segment.slice(1);
      const value = params[key];

      if (value === undefined) {
        throw new Error(`[applyPathParams] Missing path param: "${key}"`);
      }

      return encodeURIComponent(String(value));
    })
    .join("/");
};
