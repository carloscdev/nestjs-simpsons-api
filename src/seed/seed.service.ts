import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { simpsonsData } from 'src/common/data/simpsons.data';
import { Simpson } from 'src/simpsons/entities/simpson.entity';
import { SimpsonResponse } from './interfaces/simpson-response.interface';

@Injectable()
export class SeedService {

  private simpsonsData: SimpsonResponse[] = simpsonsData

  constructor(
    @InjectModel(Simpson.name)
    private readonly simpsonModel: Model<Simpson>
  ) {}

  async executeSeed() {
    try {
      await this.simpsonModel.deleteMany({});

      const simpsonsToInsert: SimpsonResponse[] = [];
      this.simpsonsData.forEach(character => {
        simpsonsToInsert.push(character);
      });
      await this.simpsonModel.insertMany(simpsonsToInsert);
      return this.simpsonsData
    } catch (error) {
      throw new BadRequestException(`Can't add seeds to DB`)
    }
  }
}
