import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-currency-stock-report',
  templateUrl: './currency-stock-report.component.html',
  styleUrls: ['./currency-stock-report.component.scss']
})
export class CurrencyStockReportComponent implements OnInit {

  isRequested = true;
  submitted = false;

  format: any = 'pdf';
  date: any = '';

  constructor(private api: RestApiService, private helper: HelperService) { }

  ngOnInit() {
  }

  getReport() {

    this.submitted = true;

    if (this.format !== '' && this.date !== '') {

      const temp = new Date(this.date);
      const dateFormated = temp.toJSON();

      const data = {
        CoName: 'Islamabad Exchange',
        BranchName: 'Head Office',
        ToDate: dateFormated,
        FileFormat: this.format,
        BranchId: 1,
        BGroupId: 1,
        BTypeId: 1,
        USubTypeId: 1
      };

      this._getReport(data);

    }
  }

  _getReport(data) {

    this.isRequested = false;

    this.api.getReport('CurrencyStock', data, 'CurrencyStockReport', this.format).then((response: any) => {

      this.isRequested = true;
      // console.log('Success', response);

    }, (error) => {

      this.isRequested = true;
      // console.log('Failure', error);

    });
  }


}