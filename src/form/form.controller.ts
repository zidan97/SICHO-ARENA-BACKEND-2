import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }
  @Get('revenue')
  getRevenue() {
    return this.formService.revenewAll();
  }

  @Get('bookingCount')
  getBookingCount() {
    return this.formService.TodaysBookingCount();
  }

  @Get('earningCount')
  getEarningCount() {
    return this.formService.TodaysEarningCount();
  }

  @Get('weeklyIncome')
  getWeeklyIncome() {
    return this.formService.WeeklyEarning();
  }

  @Get('weeklyBooking')
  getWeeklyBooking() {
    return this.formService.weeklyBooking();
  }

  @Get('personBooking/:email')
  findOne(@Param('email') email: string) {
    return this.formService.personOfBooking(email);
  }

  @Get('personBookingBasedOnTransactionId/:transactionId')
  findOneBasedOnTransactionId(@Param('transactionId') transactionId: string) {
    return this.formService.personOfBookingBasedOnTransactionId(transactionId);
  }

  @Patch('terminate/:id')
  update(@Param('id') id: string) {
    return this.formService.terminateBooking(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
