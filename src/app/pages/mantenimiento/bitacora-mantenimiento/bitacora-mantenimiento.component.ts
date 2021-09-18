import { AuthService } from 'src/app/shared/services/auth.service';
import { CardUserComponent } from './../../auth/card-user/card-user.component';
import { Component, OnInit } from '@angular/core';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBitacoraMantenimientoComponent } from './form-bitacora-mantenimiento/form-bitacora-mantenimiento.component';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { LocaleSettings } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bitacora-mantenimiento',
  templateUrl: './bitacora-mantenimiento.component.html',
  providers: [DialogService, MessageService],
})
export class BitacoraMantenimientoComponent implements OnInit {
  customerList: any[] = [];

  fechaInicio = '';
  fechaTermino = '';
  es: LocaleSettings;
  data: any[];
  ref: DynamicDialogRef;

  customerId$: Observable<number>;
  constructor(
    public dialogService: DialogService,
    private dataService: DataService,
    public authServide: AuthService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService
  ) {
    this.onSetFechaInitial();
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onSetFechaInitial();
      this.onLoadData();
    });
  }

  onSetFechaInitial() {
    var date = new Date();
    if (this.fechaInicio === '') {
      date.setDate(date.getDate() + -1);
      this.fechaInicio = formDateToString(date);
    }
    if (this.fechaTermino === '') {
      this.fechaTermino = formDateToString(new Date());
    }
  }
  onFilter() {
    this.onSetFechaInitial();
    this.onLoadData();
  }

  onDelte(item: any) {
    this.dataService.delete(`BitacoraMantenimiento/${item.id}`).subscribe(
      (resp) => {
        this.onLoadData();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  onModalFormBiacora(data: any) {
    this.ref = this.dialogService.open(FormBitacoraMantenimientoComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData();
    });
  }

  onUserCard(userId: string) {
    this.ref = this.dialogService.open(CardUserComponent, {
      data: {
        userId: userId,
      },
      header: 'Tarjeta de Usuario',
      styleClass: 'sizeCardUser',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
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
        `BitacoraMantenimiento/GetAll/${this.customerSelectService.customerId}/${this.fechaInicio}/${this.fechaTermino}`
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
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
