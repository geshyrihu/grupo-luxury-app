import { FilterReportOperationService } from 'src/app/shared/services/filter-report-operation.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ReportService } from 'src/app/shared/services/report.service';
import { environment } from 'src/environments/environment';
import { PanelDto } from 'src/app/models/operationReport/panelDto';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pending-report',
  templateUrl: './pending-report.component.html',
})
export class PendingReportComponent implements OnInit {
  urlImg = '';
  data: any[] = [];
  customerId: number;
  nameCustomer: string = '';
  logoCustomer: string = '';

  customerId$: Observable<number>;
  constructor(
    private reportService: ReportService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
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
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.customerId = this.reportService.getCustomerId();
    this.urlImg = `${
      environment.base_urlImg
    }customers/${this.filterReportOperationService.getIdCustomer()}/report/`;
    this.dataService
      .post<PanelDto>(
        'OperationReports/GetReportPending',
        this.filterReportOperationService.getPanelDto()
      )
      .subscribe(
        (resp: any) => {
          // this.data = this.reportService.onPushData(resp.body);
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          console.log(err.error);
          Swal.close();
        }
      );
  }
}
