import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { FormModule } from 'src/form/form.module';

@Module({
  imports: [FormModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
