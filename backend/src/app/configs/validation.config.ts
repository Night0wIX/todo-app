import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

export const ValidationConfig = new ValidationPipe(VALIDATION_PIPE_OPTIONS)