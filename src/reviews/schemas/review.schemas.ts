import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  review: string;

  @Prop({ required: true })
  name: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
