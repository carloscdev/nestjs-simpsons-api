import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SimpsonsService } from './simpsons.service';
import { CreateSimpsonDto } from './dto/create-simpson.dto';
import { UpdateSimpsonDto } from './dto/update-simpson.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('simpsons')
export class SimpsonsController {
  constructor(private readonly simpsonsService: SimpsonsService) {}

  @Post()
  create(@Body() createSimpsonDto: CreateSimpsonDto) {
    return this.simpsonsService.create(createSimpsonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.simpsonsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simpsonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSimpsonDto: UpdateSimpsonDto) {
    return this.simpsonsService.update(id, updateSimpsonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.simpsonsService.remove(id);
  }
}
