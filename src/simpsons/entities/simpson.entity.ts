import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Simpson extends Document {

  @Prop({
    unique: true,
    index: true
  })
  nro: number;

  @Prop({
    unique: true,
    index: true
  })
  name: string;

  @Prop({
    index: true
  })
  image: string;
}

export const SimpsonSchema = SchemaFactory.createForClass(Simpson);
