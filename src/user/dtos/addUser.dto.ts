import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AddUserDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  name: string;

  @IsEmail()
  @Length(5, 255)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(5, 100)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @IsString()
  @Length(20, 500)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;
}
