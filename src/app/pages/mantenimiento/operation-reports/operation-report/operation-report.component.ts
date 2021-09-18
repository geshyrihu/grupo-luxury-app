import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PanelDto } from 'src/app/models/operationReport/panelDto';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { FilterReportOperationService } from '../../../../shared/services/filter-report-operation.service';
import Swal from 'sweetalert2';
import { ReportService } from 'src/app/shared/services/report.service';
@Component({
  selector: 'app-operation-report',
  templateUrl: './operation-report.component.html',
})
export class OperationReportComponent implements OnInit {
  urlImg = '';
  data: any[] = [];
  customerId: number;
  nameCustomer: string = '';
  logoCustomer: string = '';

  fechaInicial = '';
  fechaFinal = '';

  customerId$: Observable<number>;

  constructor(
    private reportService: ReportService,
    private filterReportOperationService: FilterReportOperationService,
    private dataService: DataService,
    private customerSelectService: CustomerSelectService
  ) {
    this.fechaInicial =
      this.filterReportOperationService.panelDto.finishedStart;
    this.fechaFinal = this.filterReportOperationService.panelDto.finishedEnd;
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    console.log('Reporte Semanal');
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
    this.urlImg = `${environment.base_urlImg}customers/${this.filterReportOperationService.panelDto.customer}/report/`;

    this.dataService
      .post<PanelDto>(
        'OperationReports/GetReportWeekly',
        this.filterReportOperationService.panelDto
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
