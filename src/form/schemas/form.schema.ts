// src/events/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FormData extends Document {
  @Prop({ required: true })
  sportsCategory: string;

  @Prop({ required: true })
  person: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  pn: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  transactionId: string;
}

export const FormSchema = SchemaFactory.createForClass(FormData);
