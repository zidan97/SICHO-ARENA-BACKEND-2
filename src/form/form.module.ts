import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormData, FormSchema } from './schemas/form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FormData.name, schema: FormSchema }]),
    // MongooseModule.forFeature(
    //   [{ name: FormData.name, schema: FormSchema }],
    //   'form',
    // ),
  ],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
