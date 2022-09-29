import { PartialType } from '@nestjs/mapped-types';
import { CreateSimpsonDto } from './create-simpson.dto';

export class UpdateSimpsonDto extends PartialType(CreateSimpsonDto) {}
