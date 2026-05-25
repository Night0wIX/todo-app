import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

const TEXT_MIN_LENGTH = 2;
const TEXT_MAX_LENGTH = 255;

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: "Task text must not be empty." })
  @MinLength(TEXT_MIN_LENGTH, {
    message: `Task text must be at least ${TEXT_MIN_LENGTH} characters.`,
  })

  @MaxLength(TEXT_MAX_LENGTH, {
    message: `Task text must not exceed ${TEXT_MAX_LENGTH} characters.`,
  })
  text: string;

  @IsInt({ message: "categoryId must be an integer." })
  @IsPositive({ message: "categoryId must be a positive number." })
  categoryId: number;
}
