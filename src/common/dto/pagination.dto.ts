import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto {

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsString()
  search?: string;
}