import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AddDogDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 50)
  name: string;

  @Length(5, 50)
  @IsNotEmpty()
  breed: string;

  //@TODO zrobić walidację na rok urodzenia
  @IsNumber()
  bornAt: number;

  @IsString()
  @Length(20, 500)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;


}
