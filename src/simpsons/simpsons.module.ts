import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SimpsonsService } from './simpsons.service';
import { SimpsonsController } from './simpsons.controller';
import { Simpson, SimpsonSchema } from './entities/simpson.entity';

@Module({
  controllers: [SimpsonsController],
  providers: [SimpsonsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Simpson.name,
        schema: SimpsonSchema
      }
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class SimpsonsModule {}
