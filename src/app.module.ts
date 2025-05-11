import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { FormModule } from './form/form.module';
import { UsersModule } from './users/users.module';
import { SportsServiceModule } from './sports-service/sports-service.module';
import { PaymentModule } from './payment/payment.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    UsersModule,
    FormModule,
    MongooseModule.forRoot(
      
      // 'mongodb+srv://sicoarena:16MhXpiIOW5LMoKr@cluster0.ovwhpk1.mongodb.net/sicoarena',
    
      // replace clients uri
      'mongodb+srv://sicoarena:hwHQxxwMRF5y1Hin@cluster0.8smdi.mongodb.net/sicoarena',

    ),
    UsersModule,
    SportsServiceModule,
    PaymentModule,
    AnnouncementModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
