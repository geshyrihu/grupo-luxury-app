import { Router } from '@angular/router';
import { ReportService } from 'src/app/shared/services/report.service';
import { AddOrEditMeetingComponent } from './addOrEditMeeting.component';
import { AddOrEditMeetingDetailComponent } from './addOrEditMeetingDetail.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { MeetingIndextDto } from './interfaces/MeetingIndextDto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexMeetingsComponent implements OnInit {
  data: MeetingIndextDto[] = [];

  ref: DynamicDialogRef;
  customerId$: Observable<number>;
  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private reportService: ReportService,
    private route: Router,
    private customerSelectService: CustomerSelectService
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
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get<MeetingIndextDto[]>(
        `Meetings/GetAll/${this.customerSelectService.customerId}`
      )
      .subscribe(
        (resp) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }

  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete('Meetings/' + data.id).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al itentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }
  showModalAddOrEditMeeting(data: any) {
    this.ref = this.dialogService.open(AddOrEditMeetingComponent, {
      data: {
        id: data.id,
        customerId: this.customerSelectService.customerId,
      },
      header: data.title,
      styleClass: 'anchoModalInventory',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      } else {
        this.onLoadData();
      }
    });
  }
  showModalAddOrEditMeetingDetails(id: any, header: string) {
    this.ref = this.dialogService.open(AddOrEditMeetingDetailComponent, {
      data: {
        id: id,
        header: header,
      },
      header: `${header}`,
      styleClass: 'anchoModalInventory',
      closeOnEscape: true,
      // baseZIndex: 10000,
      autoZIndex: true,
    });
    this.ref.onClose.subscribe(() => {
      this.onLoadData();
    });
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  generetePDF(id: number) {
    this.reportService.setIdMinuta(id);
    this.route.navigate(['report/minuta']);
  }
}
