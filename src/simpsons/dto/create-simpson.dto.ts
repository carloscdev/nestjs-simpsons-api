import { IsInt, IsPositive, IsString, IsUrl, Min, MinLength } from "class-validator";

export class CreateSimpsonDto {

  @IsInt()
  @IsPositive()
  @Min(140)
  nro: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsUrl()
  image: string;
}
