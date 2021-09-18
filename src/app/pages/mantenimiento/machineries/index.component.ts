import { AddoreditMachineriesComponent } from './addoredit.component';
import { AddoreditMaintenanceCalendarsComponent } from '../maintenance-calendars/addoredit.component';
import { BitacoraIndividualComponent } from '../bitacora-mantenimiento/bitacora-individual/bitacora-individual.component';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderServiceComponent } from './order-service.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class MachineriesComponent implements OnInit {
  base_urlImg = '';
  data: any[];
  customerId$: Observable<number>;
  state = 0;
  ref: DynamicDialogRef;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  constructor(
    public authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private customerSelectService: CustomerSelectService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');

    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit() {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
      this.base_urlImg = this.urlImg();
    });
  }
  onLoadData() {
    this.base_urlImg = this.urlImg();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `Machineries/GetAll/${this.customerSelectService.customerId}/${this.state}`
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

  onSelectState(value): void {
    this.state = value;
    this.onLoadData();
  }

  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete('Machineries/' + data.id).subscribe(
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
  showModalAddoreditMachineries(data: any) {
    this.ref = this.dialogService.open(AddoreditMachineriesComponent, {
      data: {
        id: data.id,
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
  onBitacoraIndividual(machineryId: number) {
    this.ref = this.dialogService.open(BitacoraIndividualComponent, {
      data: {
        machineryId: machineryId,
      },
      header: '',
      closeOnEscape: true,
      width: '100%',
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
  }
  showModalListOrderService(id: number) {
    this.ref = this.dialogService.open(OrderServiceComponent, {
      data: {
        id: id,
      },
      header: 'Listado de Servicios de Mantenimiento',
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

  showModalMaintenanceCalendar(data: any) {
    this.ref = this.dialogService.open(AddoreditMaintenanceCalendarsComponent, {
      data: {
        id: data.id,
        task: data.task,
        idMachinery: data.idMachinery,
      },
      header: data.header,
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

  urlImg(): string {
    return `${environment.base_urlImg}customers/${this.customerSelectService.customerId}/machinery/`;
  }
}
