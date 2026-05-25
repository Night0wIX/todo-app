import { ValidationPipe, ValidationPipeOptions } from "@nestjs/common";

const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

export const validationConfig = new ValidationPipe(VALIDATION_PIPE_OPTIONS);
