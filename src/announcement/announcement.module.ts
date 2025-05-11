import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementData, AnnouncementSchema } from './schemas/announcement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnnouncementData.name, schema: AnnouncementSchema }]),
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
