import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function getEsmDirname(metaUrl: string) {
  return dirname(fileURLToPath(metaUrl));
}
