import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  agreement: boolean;

  // @Prop({ required: true })
  // confirm: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  nickname: string;

  // @Prop({ required: true })
  // password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
