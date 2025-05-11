import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSportsServiceDto } from './dto/create-sports-service.dto';
import { UpdateSportsServiceDto } from './dto/update-sports-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { sportsService } from './schemas/sportsService.schema';
import { Model } from 'mongoose';
import { FormService } from 'src/form/form.service';

@Injectable()
export class SportsService {
  constructor(
    @InjectModel(sportsService.name) private sportsModel: Model<sportsService>,
    private readonly bookingService: FormService,
  ) {}

  async create(createSportsServiceDto: CreateSportsServiceDto) {
    const { time, place } = createSportsServiceDto;
    const existingRecord = await this.sportsModel.findOne({
      time,
      place,
    });
    console.log(existingRecord);
    if (existingRecord) {
      throw new HttpException('Record already exists', HttpStatus.BAD_REQUEST);
    }
    const createdRecord = new this.sportsModel(createSportsServiceDto);
    return await createdRecord.save();
  }

  async findAllActive() {
    const allSports = await this.sportsModel.find().lean();
    const activeSports = allSports
      .filter((sport) => sport.status.includes('Active'))
      .map((item) => item.inputValue.trim());
    return activeSports;
    // console.log(activeSports);
    // return activeSports;
  }

  // Find all Sports Records for Admin
  async findAllSportsForAdmin() {
    return await this.sportsModel.find().exec();
  }

  async findBySports(sport: string, date) {
    const sportsDetails = await this.sportsModel
      .find({ inputValue: sport })
      .lean();
    if (!sportsDetails || sportsDetails.length === 0) {
      throw new HttpException(
        'No sports found for the provided category.',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(sportsDetails);
    // return {sportsDetails};
    // const { place, time } = sportsDetails;
    // console.log(place);
    // console.log(time);
    const bookedSlots = await this.bookingService.findOneBooking({
      sport,
      date,
      status: 'VALID',
    });
    if (!bookedSlots) {
      return sportsDetails;
    }

    console.log('booking Slots', bookedSlots);
    // extracts the time and place from the booking Slots
    // const bookedTime = bookedSlots?.time;
    // const bookedPlace = bookedSlots?.place;

    // Showing the available slots:
    // const avaialbleSportsData = sportsDetails.map((sport) => {
    //   const availableTimes = sport.time.filter(
    //     (time) => time !== bookedSlots.time,
    //   );
    //   const availablePlace = sport.place.filter(
    //     (place) => place !== bookedSlots.place,
    //   );
    const avaialbleSportsData = sportsDetails.map((sport) => {
  const availableTimes = sport.time.filter(
    (time) => !bookedSlots.some((slot) => slot.time === time)
  );

  const availablePlace = sport.place.filter(
    (place) => !bookedSlots.some((slot) => slot.place === place)
  );

      return {
        ...sport,
        time: availableTimes,
        place: availablePlace,
      };
    });
    // console.log("avaialableSportsData", avaialbleSportsData);
    return avaialbleSportsData;
    // return { bookedSlots };
  }

  findOne(id: number) {
    return `This action returns a #${id} sportsServiceeam1234`;
  }

  async updateDeactivateService(id: string) {
    const allService = await this.sportsModel.findById({ _id: id });
    if (!sportsService) {
      throw new HttpException('Sports Service not found', HttpStatus.NOT_FOUND);
    }
    allService.status[0] = 'Deactivate';
    await allService.save();
  }

  async LiveService() {
    const allService = await this.sportsModel.find();
    return allService.filter((live) => live.status[0] === 'Active').length;
  }
  async ActiveServiceCustomer() {
    const allService = await this.sportsModel.find();
    return allService.filter((live) => live.status[0] === 'Active');
  }

  remove(id: number) {
    return `This action removes a #${id} sportsService`;
  }
}
