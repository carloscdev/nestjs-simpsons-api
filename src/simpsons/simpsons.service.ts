import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSimpsonDto } from './dto/create-simpson.dto';
import { UpdateSimpsonDto } from './dto/update-simpson.dto';
import { Simpson } from './entities/simpson.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class SimpsonsService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Simpson.name)
    private readonly simpsonModel: Model<Simpson>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('default_limit');
  }

  async create(createSimpsonDto: CreateSimpsonDto) {
    try {
      const simpson = await this.simpsonModel.create(createSimpsonDto);
      return simpson;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0, search = '' } = paginationDto;
    const regex = new RegExp(search, 'i')
    return this.simpsonModel.find({name: {$regex: regex}}).limit(limit).skip(offset).select('-__v').sort('nro');
  }

  async findOne(id: string) {
    let simpson: Simpson;

    if(!isNaN(+id)) {
      simpson = await this.simpsonModel.findOne({nro: id}).select('-__v');
    }

    if(isValidObjectId(id)) {
      simpson = await this.simpsonModel.findById(id).select('-__v');
    }

    if(!simpson) throw new NotFoundException(`Character with id or nro not found`);
    return simpson;
  }

  async update(id: string, updateSimpsonDto: UpdateSimpsonDto) {
    const simpson = await this.findOne(id);
    try {
      await simpson.updateOne(updateSimpsonDto, { new: true });
      return { ...simpson.toJSON(), ...updateSimpsonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.simpsonModel.deleteOne({_id: id});
    if (deletedCount === 0) {
      throw new BadRequestException(`Character with id ${id} not found`);
    }
    return `Character with id ${id} was removed`;
  }

  private handleExceptions(error: any) {
    if (error?.code === 11000) throw new BadRequestException(`Character exists in db ${JSON.stringify(error.keyValue)}`)
    throw new InternalServerErrorException(`Can't create character - Check server logs`)
  }
}
