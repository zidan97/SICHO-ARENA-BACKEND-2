import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormData } from './schemas/form.schema';
import { Model } from 'mongoose';
import { CLIENT_RENEG_LIMIT } from 'tls';
@Injectable()
export class FormService {
  // private submitFormDatas=[]
  // create(createFormDto: CreateFormDto) {
  //   const newSubmitFormDatas = {
  //     id: this.submitFormDatas.length + 1,
  //     ...CreateFormDto,
  //   };
  //   this.submitFormDatas.push(newSubmitFormDatas);
  //   return newSubmitFormDatas;
  // }

  constructor(@InjectModel(FormData.name) private formModel: Model<FormData>) {}
  async create(createFormDto: CreateFormDto): Promise<FormData> {
    const createdForm = new this.formModel(createFormDto);
    return createdForm.save();
  }

  async findAll(): Promise<FormData[]> {
    return this.formModel.find().sort({ _id: -1 }).exec();
  }

  async findOneBooking({ sport, date, status }) {
    return await this.formModel.find({
      sportsCategory: sport,
      date,
      status,
    });
  }

  async updateBookingStatus(transactionId: string, status: string) {
    const form = await this.formModel.findOne({ transactionId });
    if (!form) {
      throw new HttpException('Form not found', HttpStatus.NOT_FOUND);
    }
    form.status = status;
    await form.save();
  }

  async terminateBooking(id: string) {
    const booking = await this.formModel.findById({ _id: id });

    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }
    booking.status = 'TERMINATED';
    await booking.save();
  }

  async revenewAll() {
    const booking = await this.formModel.find().sort({ date: -1 });
    return booking
      .filter((book) => book.status === 'VALID' || book.status === 'TERMINATED')
      .map((entry) => ({
        sportsCategory: entry.sportsCategory,
        price: entry.person,
        date: entry.date,
      }));
  }

  async TodaysBookingCount() {
    const booking = await this.formModel.find().sort({ date: -1 });
    const todaysDate = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
    return booking.filter(
      (book) =>
        book.date === todaysDate &&
        ['VALID', 'TERMINATED'].includes(book.status),
    ).length;
  }
  async TodaysEarningCount() {
    const booking = await this.formModel.find().sort({ date: -1 });
    const todaysDate = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

    return booking
      .filter(
        (book) =>
          book.date === todaysDate &&
          ['VALID', 'TERMINATED'].includes(book.status),
      )
      .map((earning) => ({
        price: earning.person.split('-')[1],
      }));
  }

  async WeeklyEarning() {
    const allBookings = await this.formModel.find().lean();
    const bookings = allBookings.filter(
      (book) => book.status === 'VALID' || book.status === 'TERMINATED',
    );
    const result = [];
    const dayMap = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const weeklyEarnings = bookings.reduce((acc, book) => {
      const bookingDate = new Date(book.date);

      // Filter for bookings within the last 7 days
      if (bookingDate >= sevenDaysAgo && bookingDate <= today) {
        const getDayOfNumber = bookingDate.getDay();
        const getDayName = dayMap[getDayOfNumber];
        const price = parseInt(book.person.split('-')[1]);

        // Add earnings for the corresponding day of the week
        if (acc[getDayName]) {
          acc[getDayName] += price;
        } else {
          acc[getDayName] = price;
        }
      }

      return acc;
    }, {});

    const listWeeks = [weeklyEarnings];
    console.log(listWeeks);
    // Convert to the desired array format
    // value ={ Friday: 10, Saturday: 60, Thursday: 20 }

    function convert(value) {
      // const result = [];
      for (let i = 0; i < value.length; i++) {
        for (const [k, v] of Object.entries(value[i])) {
          const res = {
            day: k,
            earnings: v,
          };
          result.push(res);
        }
      }
      console.log(result);
    }

    convert(listWeeks);

    return result;
  }

  async weeklyBooking() {
    const allBookings = await this.formModel.find().lean();
    const bookings = allBookings.filter(
      (book) => book.status === 'VALID' || book.status === 'TERMINATED',
    );

    const dayMap = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    const result = [];
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const weeklyBookings = bookings.reduce((acc, book) => {
      const bookingDate = new Date(book.date);

      if (bookingDate >= sevenDaysAgo && bookingDate <= today) {
        const getDayOfNumber = bookingDate.getDay();
        const getDayName = dayMap[getDayOfNumber];

        // Add earnings for the corresponding day of the week
        if (acc[getDayName]) {
          acc[getDayName] += 1;
        } else {
          acc[getDayName] = 1;
        }
      }

      return acc;
    }, {});

    const listWeeks = [weeklyBookings];
    // console.log(listWeeks);
    // Convert to the desired array format
    // value ={ Friday: 10, Saturday: 60, Thursday: 20 }

    function convert(value) {
      for (let i = 0; i < value.length; i++) {
        for (const [k, v] of Object.entries(value[i])) {
          // let res = ` {day:${k}: booking : ${v}}`;
          const res = {
            day: k,
            bookings: v,
          };
          result.push(res);
        }
      }
      // console.log(result);
    }

    convert(listWeeks);
    return result;
  }

  // specific person booking data fetch
  async personOfBooking(email: string) {
    const bookings = await this.formModel.find({ email }).sort({ _id: -1 });
    if (!bookings) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }
    return bookings;
  }

  // specific person bookking based on transaction id
  async personOfBookingBasedOnTransactionId(transactionId: string) {
    const bookings = await this.formModel.findOne({ transactionId });
    if (!bookings) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }
    return bookings;
  }
  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
