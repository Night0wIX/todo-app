import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: "Task text must not be empty." })
  @MinLength(2, { message: "Task text must be at least 2 characters." })
  @MaxLength(255, { message: "Task text must not exceed 255 characters." })
  text: string;

  @IsInt({ message: "categoryId must be an integer." })
  @IsPositive({ message: "categoryId must be a positive number." })
  categoryId: number;
}
