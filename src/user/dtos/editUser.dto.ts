import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 255)
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @IsOptional()
  @IsString()
  @Length(20, 500)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;
}
