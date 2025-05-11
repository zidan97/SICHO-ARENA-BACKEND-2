import { Module } from '@nestjs/common';
import { SportsService } from './sports-service.service';
import { SportsServiceController } from './sports-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  sportsService,
  sportsServiceSchema,
} from './schemas/sportsService.schema';
import { FormModule } from 'src/form/form.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: sportsService.name,
        schema: sportsServiceSchema,
      },
    ]),
    FormModule,
  ],

  controllers: [SportsServiceController],
  providers: [SportsService],
})
export class SportsServiceModule {}
