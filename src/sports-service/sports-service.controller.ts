import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportsService } from './sports-service.service';
import { CreateSportsServiceDto } from './dto/create-sports-service.dto';
import { UpdateSportsServiceDto } from './dto/update-sports-service.dto';

@Controller('sports-service')
export class SportsServiceController {
  constructor(private readonly sportsService: SportsService) {}

  @Post()
  create(@Body() createSportsServiceDto: CreateSportsServiceDto) {
    return this.sportsService.create(createSportsServiceDto);
  }

  @Get()
  findAll() {
    return this.sportsService.findAllActive();
  }

  @Get('admin')
  findAllSportsForAdmin() {
    return this.sportsService.findAllSportsForAdmin();
  }

  // get the  sports service by name
  // @Get(':sport')
  // findBySports(@Param('sport') sport: string) {
  //   return this.sportsService.findBySports(sport);
  // }
  @Get(':sport/:year/:month/:day')
  async findBySports(
    @Param('sport') sport: string,
    @Param('year') year: string,
    @Param('month') month: string,
    @Param('day') day: string,
  ) {
    const date = `${year}/${month}/${day}`; // Combine date parts
    return this.sportsService.findBySports(sport, date);
  }

  @Get('live')
  getLiveSports() {
    return this.sportsService.LiveService();
  }
  @Get('active')
  getActiveSports() {
    return this.sportsService.ActiveServiceCustomer();
  }
  @Patch('deactivate/:id')
  update(@Param('id') id: string) {
    // console.log(id);
    return this.sportsService.updateDeactivateService(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsService.remove(+id);
  }
}
