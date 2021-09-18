import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { OrdenCompraService } from 'src/app/shared/services/orden-compra.service';
import { CreateOrdenCompraComponent } from '../../orden-compra/create-orden-compra/create-orden-compra.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-orden-compra-fijos',
  templateUrl: './index-orden-compra-fijos.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexOrdenCompraFijosComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;
  statusCompra: number;
  customerId$: Observable<number>;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private router: Router,
    private customerSelectService: CustomerSelectService,
    private ordenCompraService: OrdenCompraService
  ) {
    this.Asistente = authService.validationRole('Asistente');
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
    this.dataService
      .get(
        `OrdenCompra/OrdenesCompraGastosFijos/${this.customerSelectService.customerId}/${this.statusCompra}`
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

  onAddOrEdit(id: number) {
    // this.router.navigateByUrl(`shopping/ordenCompraFijo/${id}`);
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
