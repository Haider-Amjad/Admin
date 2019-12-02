import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../../services/api/rest-api.service';
import { HelperService } from '../../../../services/helper/helper.service';

@Component({
  selector: 'app-booking-wise',
  templateUrl: './booking-wise.component.html',
  styleUrls: ['./booking-wise.component.scss']
})
export class BookingWise implements OnInit {



  constructor(private api: RestApiService, private helper: HelperService) { }

  ngOnInit() {
  }

  excelExport(){
    
    this.api.getReport('bookingdetails/getBookingReport').then((response: any) => {
    
    }, () => {
      
      this.helper.successToast('Success!', 'Booking Data is Exported in Excel');
    });

  }

}
