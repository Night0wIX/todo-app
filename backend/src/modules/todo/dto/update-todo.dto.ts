import { IsBoolean, IsOptional } from "class-validator";

export class UpdateTodoDto {
  @IsOptional()
  @IsBoolean({ message: "completed must be a boolean value." })
  completed?: boolean;
}
