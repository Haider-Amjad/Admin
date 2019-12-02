import { Component, OnInit } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { NgxSpinnerService } from 'ngx-spinner';

// Global Deceleration for Paypal
declare var $: any;
declare let paypal: any;

declare const jQuery: {
  confirm: Function
};

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  
  spinnerText = '';
  isSubmitted = false;
  bookingId;
  paymentStatus;
  orderData: any;
  invalidOrderIdText;
  usdPrice;

    // Paypal Variables
    addScript: boolean = false;
    paypalLoad: boolean = true;
    paypalConfigg: any;

  constructor
  (
    private toastrService: ToastrService,
    private router: Router, 
    private route: ActivatedRoute,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
    private helper: HelperService
  ) {
    this.bookingId = this.route.snapshot.paramMap.get("id");
    console.log('bookingId:'+this.bookingId);
  }
  ngOnInit() {
    this.getOrderData()
  }

  getOrderData() {
    this.spinner.show();
    this.spinnerText = 'Fetching Details.. Please wait';

    this.api.get('bookingdetails/get_bookingDetailById/' + this.bookingId).then((response: any) => {
    
    this.orderData=response;      
    this.paymentStatus = this.orderData.paymentStatus;
    this.usdPrice = this.orderData.price;
    console.log("orderData"+this.orderData.paymentStatus)
    if(this.orderData.paymentStatus=="pending"){
      this.paymentOption();
    }
    this.spinner.hide();
    }, () => {
      this.invalidOrderIdText="invalid";
      this.spinner.hide();
      this.helper.failureBigToast('Failed!', 'Order ID is invalid');
    });

  }

  // _getJobPostDetailData() {


  //   this.api.get('bookingdetails/get_bookingDetailById/'+ this.bookingId).then((response: any) => {
  //   this.orderData = response;
  //   this.status = this.orderData.payment;
  //   console.log("order data"+this.orderData.paymentStatus);

  //   }, () => {
  //     this.toastrService.success("Failed!', 'Something went wrong while fetching Job Post Details.");
  //   });
  // }


    sendUpdateRequest(data) {
    console.log("Req",data)

    this.api.patch('bookingdetails/update_bookingDetails/', this.bookingId, data).then((response: any) => {

      this.helper.successBigToast('Success', 'Successfully Paid for the Order');
      
      
      // setTimeout(() => 
      // {
      //   window.location.reload();
      // },
      // 3000);

    }, () => {

      this.helper.failureBigToast('Failed!', 'Kindly try again');

    });

  }




  // Paypal Code
  addPaypalScript() {
   
      this.addScript = true;
      return new Promise((resolve, reject) => {
        let scripttagElement = document.createElement('script');    
        scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
      })
  }
  paymentOption(){

    if(true){

     if (!this.addScript) {
       this.addPaypalScript().then(() => {
         paypal.Button.render(this.paypalConfigg, '#paypal-checkout-btn');
         this.paypalLoad = false;
       })
    // }
   }
 
     this.paypalConfigg = {
       env: 'sandbox',
       client: {
         sandbox: 'Ac-QK_Lkar46qQDWcp1kega6aPk13SxXv3dkCVX7A2Nlw7BViP3JyDUQQg-6W386yjgaeEHTuaO9BxGx',
         production: '<your-production-key here>'
       },
       commit: true,
       payment: (data, actions) => {
         return actions.payment.create({
           payment: {
             transactions: [
              // Amount and Currency set
               { amount: { total:this.usdPrice, currency: 'USD' } }

             ]
           }
         });
       },
       onAuthorize: (data, actions) => {
         actions.order.get().then(details => {
           console.log(details)
           if(details.status == "APPROVED"){
            //  this.jobPost.payment = 'paid';
            this.paymentStatus="paid"
             let paymentData = {
              paymentStatus : 'paid',
              state:'accepted'
            }
             this.toastrService.success(
               "We have Successfully Processed your Payment",
               "Thank you!!"
             );
             $('#paypal-checkout-btn').hide();
             $('#payment-text').hide();
             $('#payment-icon').hide();
             this.sendUpdateRequest(paymentData);
           } else {
             this.toastrService.error(
               "There was an error in processing your Payment",
               "Warning"
             );
           }
         });
       }, 
     };
    } else {
      this.addScript=false;
    }
  }



}
