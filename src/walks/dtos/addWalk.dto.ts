import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddWalkDto {
  @IsString()
  @IsNotEmpty()
  dateOfWalk: string;
  @IsNumber()
  @IsNotEmpty()
  hourOfWalk: number;
}
