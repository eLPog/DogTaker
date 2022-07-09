import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class EditDogDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  @IsNotEmpty()
  breed: string;

  @IsOptional()
  @IsNumber()
  bornAt: number;

  @IsOptional()
  @IsString()
  @Length(20, 500)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;
}
