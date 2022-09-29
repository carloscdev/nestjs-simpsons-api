import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SimpsonsModule } from 'src/simpsons/simpsons.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SimpsonsModule]
})
export class SeedModule {}
