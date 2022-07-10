import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class AddWalkDto {
  @IsDate()
  @IsNotEmpty()
  dateOfWalk: Date;
  @IsNumber()
  @IsNotEmpty()
  hourOfWalk: number;
}
