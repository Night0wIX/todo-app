import { envConfig } from "@/app/configs/env.config.js";
import { Params as PinoParams } from "nestjs-pino";

const isDev = envConfig.NODE_ENV === "development"

export const loggerConfig: PinoParams = {
  pinoHttp: {
level: isDev ? "debug" : "error",

  ...(isDev && {transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss",
            ignore: "pid,hostname",
          },
        }} )
}
  }

  
