import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class sportsService extends Document {
  @Prop({ required: true })
  inputValue: string;

  @Prop({ required: true })
  person: string;

  @Prop({ required: true })
  personPrice: string[];

  @Prop({ required: true })
  place: string[];

  @Prop({ required: true })
  status: string[];

  @Prop({ required: true })
  time: string[];
}

export const sportsServiceSchema = SchemaFactory.createForClass(sportsService);
