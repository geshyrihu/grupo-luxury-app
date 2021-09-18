import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CreateOrdenCompraComponent } from './create-orden-compra/create-orden-compra.component';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { OrdenCompraService } from 'src/app/shared/services/orden-compra.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CaratulaFondeoComponent } from '../../caratula-fondeo/caratula-fondeo.component';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes-compra.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class OrdenesCompraComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;
  statusCompra: number;
  customerId$: Observable<number>;

  // Permisos
  Asistente: boolean = true;
  Mantenimiento: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private router: Router,
    private ordenCompraService: OrdenCompraService,
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
    this.statusCompra = this.ordenCompraService.getStatusCompras();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.data = [];
    this.dataService
      .get(
        `OrdenCompra/GetAll/${this.customerSelectService.customerId}/${this.statusCompra}`
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
    this.dataService.delete(`OrdenCompra/${data.id}`).subscribe(
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

  onModalAdd() {
    this.ref = this.dialogService.open(CreateOrdenCompraComponent, {
      data: {},
      header: 'Nueva Orden de compra',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  onModalCaratula() {
    this.ref = this.dialogService.open(CaratulaFondeoComponent, {
      data: {},
      header: 'Caratula',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  onAddOrEdit(id: number) {
    this.router.navigateByUrl(`shopping/ordenCompra/${id}`);
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  selectStatus(status: number): void {
    this.ordenCompraService.setStatusCompras(status);
    this.onLoadData();
  }
}
