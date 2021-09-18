import { FilterReportOperationService } from 'src/app/shared/services/filter-report-operation.service';

import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
})
export class ReportHeaderComponent implements OnInit {
  logoLuxury = `${environment.base_urlImg}logo2.jpg`;
  @Input()
  nameCustomer = '';
  @Input()
  logoCustomer = '';

  customerId$: Observable<number>;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private filterReport: FilterReportOperationService,
    private customerService: CustomerSelectService,
    private filterReportOperationService: FilterReportOperationService,
    private customerSelectService: CustomerSelectService
  ) {
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.filterReportOperationService.setIdCustomer(
        this.customerSelectService.customerId
      );
      this.onLoadData();
    });
  }
  onLoadData() {
    this.dataService
      .get(`Customers/${this.customerService.customerId}`)
      .subscribe((resp: any) => {
        this.nameCustomer = resp.body.nameCustomer;
        this.logoCustomer = `${environment.base_urlImg}Administration/customer/${resp.body.photoPath}`;
      });
  }
}
