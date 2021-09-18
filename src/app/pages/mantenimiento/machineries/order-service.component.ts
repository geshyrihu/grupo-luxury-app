import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AddoreditMaintenanceCalendarsComponent } from '../maintenance-calendars/addoredit.component';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
})
export class OrderServiceComponent implements OnInit {
  maintenanceCalendars: any[] = [];
  idMachinery: number = 0;
  // id: number = 0;
  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private authService: AuthService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.idMachinery = this.config.data.id;
    // this.id = this.config.data.id;

    if (this.idMachinery !== 0) {
      this.loadItem();
    }
  }

  loadItem() {
    this.dataService
      .get(`MaintenanceCalendars/ListService/${this.idMachinery}`)
      .subscribe(
        (resp: any) => {
          this.maintenanceCalendars = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Desea Eliminar este registro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.dataService.delete(`MaintenanceCalendars/${id}`).subscribe(
          (resp) => {
            this.showToast('info', 'Info', `Registro borrado!`);
            this.loadItem();
          },
          (err) => {
            this.showToast('error', 'Error', 'Error al itentar borrar');
            console.log(err.error);
          }
        );
      },
      reject: () => {
        //reject action
      },
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
      this.loadItem();
    });
  }
  deleteMaintenanceOrder(data: any) {
    this.dataService.delete(`MaintenanceCalendars/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `${data.id} Borrado!`);
        this.loadItem();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al itentar borrar');
        console.log(err.error);
      }
    );
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
