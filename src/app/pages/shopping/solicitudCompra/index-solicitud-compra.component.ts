import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './index-solicitud-compra.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class PurchaseRequestComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;
  customerId$: Observable<number>;
  statusCompra: number = 2;
  status: any = 2;

  // Permisos
  Asistente: boolean = true;
  Mantenimiento: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private router: Router,
    private customerSelectService: CustomerSelectService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');

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
        `SolicitudCompra/Solicitudes/${this.customerSelectService.customerId}/${this.status}`
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
    this.dataService.delete(`SolicitudCompra/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `${data.id} Borrado!`);
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

  onSolicitudCompra(id: number) {
    this.router.navigateByUrl(`shopping/solicitudCompra/${id}`);
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onSelectStatus(status: any) {
    this.status = status;
    this.onLoadData();
  }
  // ...Crear Orden de compra
  onCreateOrder(id: any) {
    this.router.navigateByUrl(`shopping/ordenCompra/${0}/${id}`);
  }
}
