import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnouncementData } from './schemas/announcement.schema';

@Injectable()
export class AnnouncementService {

  constructor(
    @InjectModel(AnnouncementData.name) private announcementModel: Model<AnnouncementData>,
   
  ) {}


 async create(createAnnouncementDto: CreateAnnouncementDto) {
   const { title, body } = createAnnouncementDto
   const existingRecord = await this.announcementModel.findOne({
     title,body
   })

   if (existingRecord) {
     throw new HttpException('Record already exists', HttpStatus.BAD_REQUEST);
   }
     const createdRecord = new this.announcementModel(createAnnouncementDto);
    return await createdRecord.save();
  }

  async findAll() {
   return await this.announcementModel.find().sort({ _id: -1 });
    
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
