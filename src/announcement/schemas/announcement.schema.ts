// src/events/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AnnouncementData extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  
}

export const AnnouncementSchema = SchemaFactory.createForClass(AnnouncementData);