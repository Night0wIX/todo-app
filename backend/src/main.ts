import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "@/app/app.module.js";
import { corsConfig } from "@/app/configs/cors.config.js";
import { envConfig } from "@/app/configs/env.config.js";
import { validationConfig } from "@/app/configs/validation.config.js";
import { API_PREFIX } from "@/app/constants.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors(corsConfig);
  app.useGlobalPipes(validationConfig);

  await app.listen(envConfig.PORT);
}

bootstrap().catch((error: unknown) => {
  process.stderr.write(`Application failed to start: ${String(error)}\n`);
  process.exit(1);
});
