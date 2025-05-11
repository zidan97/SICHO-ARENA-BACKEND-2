import { Controller, Post, Body, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  async initiatePayment(
    @Body()
    body: {
      amount: number;
      tranId: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      productName: string;
    },
  ) {
    const paymentUrl = await this.paymentService.createInitiatePayment(
      body.amount,
      body.tranId,
      body.customerName,
      body.customerEmail,
      body.customerPhone,
      body.productName,
    );
    console.log("PaymentURL", paymentUrl);
    return { paymentUrl };
  }

  // For Success 
  @Post('success')
  async handleSuccess(@Body() body: any, @Res() res: any) {
    console.log("Success", body);
    const { status, tran_id } = body;
    if (status === "VALID") {
      await this.paymentService.updateStatus(tran_id, status);

      // return res.redirect('http://localhost:5173/payment/success');
      return res.redirect(`http://localhost:5173/payment/success?tran_id=${tran_id}`)
      
    }
    else {
      return res.redirect('http://localhost:5173/payment/failure')
    }
  }

  // Fail URL
  @Post('fail')
  async handleFail(@Body() body: any, @Res() res: any) {
    console.log("fail", body);
    const { status, tran_id } = body;
    if (status === 'FAILED') {
      await this.paymentService.updateStatus(tran_id, status);

      return res.redirect('http://localhost:5173/payment/fail');
    }
  }
  @Post('cancel')
  async handleCancel(@Body() body: any, @Res() res: any) {
    console.log("Cancel", body);
    const { status, tran_id } = body;
    if (status === 'CANCELLED') {
      await this.paymentService.updateStatus(tran_id, status);

      return res.redirect('http://localhost:5173/payment/cancel');
    }
  }
}


