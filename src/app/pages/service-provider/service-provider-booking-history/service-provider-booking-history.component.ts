import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Router, ActivatedRoute} from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProvidersEditComponent } from '../service-provider-edit/service-provider-edit.component';

@Component({
  selector: 'app-service-provider-booking-history',
  templateUrl: './service-provider-booking-history.component.html',
  styleUrls: ['./service-provider-booking-history.component.scss']
})
export class ServiceProvidersBookingHistoryComponent implements OnInit {

  isDataLoaded = false;
  userId;
  serviceProviderEmail;
  users = [];

  
  dtOptions: DataTables.Settings = {};


  constructor(
    private api: RestApiService, 
    private router: Router, 
    private route: ActivatedRoute,
    private helper: HelperService,
     private modalService: NgbModal
    ) { 
          // get customer email from url param 
          this.serviceProviderEmail = this.route.snapshot.paramMap.get("serviceProviderEmail");
          console.log('serviceProviderEmail:'+this.serviceProviderEmail);
    }

  ngOnInit(): void {
    console.log("ngOnInit called")
    this.getUsersBooking();
  }


  getUsersBooking() {
    this.api.get('bookingdetails/get_Bookingdetails/'+this.serviceProviderEmail).then((response: any) => {
      this.users = response;


      this.dtOptions = {
        data: this.users,
        columns: [
        {
          title: 'Date',
          data: 'date'
        },
        {
          title: 'Time',
          data: 'time'
        },
        {
          title: 'Payment Status',
          data: 'paymentStatus'
        },
        {
          title: 'Booking Type',
          data: 'bookingType'
        },
        {
          title: 'Customer Name',
          data: 'customerName'
        },
        {
          title: 'Price',
          data: 'price'
        },
        {
          title: 'Payment',
          data: 'paymentStatus'
        },
        {
          title: 'Booking State',
          data: 'state',
          render: function (data, type, row) {
            if (data === "completed") {
              return '<span class="badge badge-pill badge-success">Completed</span>';
            }
            else if (data === "accepted") {
              return '<span class="badge badge-pill badge-warning">Accepted</span>';
            }
            else if (data === "pending") {
              return '<span class="badge badge-pill badge-danger">Pending</span>';
            }
            
          }
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          // tslint:disable-next-line: deprecation
          $('td', row).unbind('click');
          // tslint:disable-next-line: deprecation
          // $('td', row).bind('click', () => {
          //   self.selectedUser(data);
          // });
          return row;
        }
      };

      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }

  selectedUser(user) {
    this._openEditModal(user);
  }

  _openEditModal(user) {
    const modalRef = this.modalService.open(ServiceProvidersEditComponent);
    modalRef.componentInstance.user = user;

    // modalRef.result.then(() => { window.location.reload() });


    // modalRef.result.then(() => { window.location.reload() }, () => { window.location.reload()});
    // modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }
}
