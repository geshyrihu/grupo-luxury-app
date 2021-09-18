import { AddoreditMaintenanceCalendarsComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EArea } from '../../../shared/enums/EArea';
import { EMonth } from '../../../shared/enums/EMonth';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

const date = new Date();
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService],
})
export class MaintenanceCalendarsComponent implements OnInit {
  data: any[] = [];
  enumAreas: any[] = EArea.GetEnum();
  isInRole: boolean;
  month = date.getMonth();
  months: any[] = EMonth.GetEnum();
  ref: DynamicDialogRef;
  customerId$: Observable<number>;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');

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
      .get(
        `MaintenanceCalendars/${this.customerSelectService.customerId}/${this.month}`
      )
      .subscribe(
        (resp: any) => {
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
    this.dataService.delete(`MaintenanceCalendars/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }
  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditMaintenanceCalendarsComponent, {
      data: {
        id: data.id,
        task: data.task,
      },
      header: data.title,
      styleClass: 'anchoModalInventory',
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
  selectMonth(event: any) {
    this.month = event;
    this.onLoadData();
  }
}
