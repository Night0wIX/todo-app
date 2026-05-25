import { Params as PinoParams } from "nestjs-pino";
import { PrettyOptions } from "pino-pretty";

import { envConfig } from "@/app/configs/env.config.js";

const IS_DEV = envConfig.NODE_ENV === "development";

const LOG_LEVEL = {
  development: "debug",
  production: "error",
} as const satisfies Record<typeof envConfig.NODE_ENV, string>;

const PRETTY_TRANSPORT_OPTIONS: PrettyOptions = {
  colorize: true,
  translateTime: "SYS:HH:MM:ss",
  ignore: "pid,hostname",
};

// Makes logs prettier on development environment
function buildDevTransport(): PinoParams["pinoHttp"] {
  if (!IS_DEV) {
    return {};
  }

  return {
    transport: {
      target: "pino-pretty",
      options: PRETTY_TRANSPORT_OPTIONS,
    },
  };
}

export const loggerConfig: PinoParams = {
  pinoHttp: {
    level: LOG_LEVEL[envConfig.NODE_ENV],
    ...buildDevTransport(),
  },
};
