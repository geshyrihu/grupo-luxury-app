import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AddoreditSistemasReporteComponent } from '../addoredit-sistemas-reporte/addoredit-sistemas-reporte.component';
@Component({
  selector: 'app-sistemas-reporte',
  templateUrl: './sistemas-reporte.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class SistemasReporteComponent implements OnInit {
  ref: DynamicDialogRef;
  base_urlImg = `${environment.base_urlImg}customers/`;
  data: any[] = [];
  listCustomer: any[] = [];
  isInRole: boolean;
  url = `${environment.base_urlImg}Administration/accounts/`;
  url_Customer = `${environment.base_urlImg}Administration/customer/`;

  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();
  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get('OperationReports/SistemasPendientes').subscribe(
      (resp: any) => {
        this.data = resp.body;
        Swal.close();
      },
      (err) => {
        console.log(err.error);
        Swal.close();
      }
    );
  }
  onLoadDataTerminados() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `OperationReports/SistemasTerminados/${formDateToString(
          this.fechaInicial
        )}/${formDateToString(this.fechaFinal)}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          console.log(err.error);
          Swal.close();
        }
      );
  }
  onLoadDataDenegados() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get(`OperationReports/SistemasDenegado`).subscribe(
      (resp: any) => {
        this.data = resp.body;
        Swal.close();
      },
      (err) => {
        console.log(err.error);
        Swal.close();
      }
    );
  }
  showModalAddOrEdit(id: number) {
    this.ref = this.dialogService.open(AddoreditSistemasReporteComponent, {
      data: {
        id: id,
      },
      header: 'Reporte de operación',
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
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
