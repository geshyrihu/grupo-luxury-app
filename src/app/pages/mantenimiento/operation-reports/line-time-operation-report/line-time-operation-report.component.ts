import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../../../../shared/services/data.service';
import Swal from 'sweetalert2';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddoreditOperationReportComponent } from '../addoredit.component';

@Component({
  selector: 'app-line-time-operation-report',
  templateUrl: './line-time-operation-report.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class LineTimeOperationReportComponent implements OnInit {
  ref: DynamicDialogRef;
  data: any = [];
  url = `${environment.base_urlImg}Administration/accounts/`;
  customerId$: Observable<number>;
  base_urlImg = '';

  constructor(
    private dataService: DataService,
    private customerSelectService: CustomerSelectService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }

  onLoadData() {
    this.base_urlImg = `${environment.base_urlImg}customers/${this.customerSelectService.customerId}/report/`;
    this.data = [];
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(`OperationReports/LineTime/${this.customerSelectService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          console.log('data: ', resp.body);

          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);

          Swal.close();
        }
      );
  }

  showModalAddOrEdit(id: any) {
    this.ref = this.dialogService.open(AddoreditOperationReportComponent, {
      data: {
        id,
        customerAuthId: this.customerSelectService.customerId,
      },
      header: 'Actualizar Registro',
      styleClass: 'anchoModalOperationReport',
      autoZIndex: true,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  // TODO
  onDiferenciaDate(date1, date2) {
    if (date1 !== null && date2 !== null) {
      const dateReport1 = new Date(date1);
      const dateReport2 = new Date(date2);
    }
  }
  onCompareFecha(date: Date): boolean {
    if (date !== null) {
      const dateNow = new Date();
      const dateReport = new Date(date);

      if (dateReport.getTime() < dateNow.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
