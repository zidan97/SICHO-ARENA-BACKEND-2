import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FormService } from 'src/form/form.service';

@Injectable()
export class PaymentService {
  constructor(private readonly bookingService: FormService) {}

  private sslcommerzApi = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

  private storeid = 'sicoa6731d1b92a239';

  private storepass = 'sicoa6731d1b92a239@ssl';

  public curr = 'BDT';
  public productCategory = 'SlotBooking';
  public emiOption = 0;
  public customerAddress = 'MerulBadda';
  public customerCity = 'Dhaka';
  public customerPostCode = '1212';
  public customerCountry = 'Bangladesh';
  public shippingMethod = 'No';
  public product_category = 'BookingTicket';
  public product_profile = 'general';
  public successUrl = 'http://localhost:3000/payment/success';
  public failUrl = 'http://localhost:3000/payment/fail';
  public cancelUrl = 'http://localhost:3000/payment/cancel';
  FormService: any;

  async createInitiatePayment(
    amount: number,
    tranId: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    productName: string,
  ) {
    const paymentData = {
      store_id: this.storeid,
      store_passwd: this.storepass,
      total_amount: amount,
      tran_id: tranId,
      success_url: this.successUrl,
      fail_url: this.failUrl,
      cancel_url: this.cancelUrl,
      cus_name: customerName,
      cus_email: customerEmail,
      cus_add1: this.customerAddress,
      cus_city: this.customerCity,
      cus_postcode: this.customerPostCode,
      cus_country: this.customerCountry,
      cus_phone: customerPhone,
      shipping_method: this.shippingMethod,
      product_name: productName,
      product_category: this.product_category,
      product_profile: this.product_profile,
    };

    //   hit the SSlCOMERZ for getting the GateWaypageURL

    // try {
    //   const responseFromTheSSL = await axios.post(
    //     this.sslcommerzApi,
    //     paymentData,
    //   );

    //   console.log('responseFromThe_SSl', responseFromTheSSL);
    //   console.log('payment data', paymentData);
    //   return responseFromTheSSL.data.GatewayPageURL;
    // }
    try {
      const responseFromTheSSL = await axios.post(
        this.sslcommerzApi,
        new URLSearchParams({
          ...paymentData,
          total_amount: paymentData.total_amount.toString(),
        }).toString(), // Ensure data is sent as x-www-form-urlencoded
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      // console.log('responseFromThe_SSl', responseFromTheSSL.data);
      return responseFromTheSSL.data.GatewayPageURL;
    } catch (error) {
      // console.log('error', error);
    }
  }

  async updateStatus(tranId: string, status: string) {
    await this.bookingService.updateBookingStatus(tranId, status);
  }

  // async paymentAll() {
  //   await this.
  // }
}
