import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface.js";
import { envConfig } from "@/app/configs/env.config.js";

export const corsConfig: CorsOptions = {
  origin: envConfig.CORS_ORIGIN,
};
