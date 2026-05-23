import { NestFactory } from "@nestjs/core";
import { envConfig } from "@/app/configs/env.config.js";
import { AppModule } from "@/app/app.module.js";
import { corsConfig } from "@/app/configs/cors.config.js";
import { API_PREFIX } from "@/app/constants.js";
import { ValidationConfig } from "@/app/configs/validation.config.js";
import { Logger } from "nestjs-pino";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(Logger);

  app.useLogger(logger);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors(corsConfig);
  app.useGlobalPipes(ValidationConfig);

  await app.listen(envConfig.PORT);
}

bootstrap();
