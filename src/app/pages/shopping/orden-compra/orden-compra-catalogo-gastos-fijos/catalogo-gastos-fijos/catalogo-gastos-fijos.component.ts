import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogoGastosFijosService } from 'src/app/shared/services/catalogo-gastos-fijos.service';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

import { ModalOrdenCompraGrastosFijosComponent } from '../modal-orden-compra-grastos-fijos/modal-orden-compra-grastos-fijos.component';

const date = new Date();

@Component({
  selector: 'app-catalogo-gastos-fijos',
  templateUrl: './catalogo-gastos-fijos.component.html',
  providers: [DialogService, MessageService],
})
export class CatalogoGastosFijosComponent implements OnInit {
  data: any = [];
  ref: DynamicDialogRef;
  customerId$: Observable<number>;
  fechaSolicitud: string;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService,
    private catalogoGastosFijosService: CatalogoGastosFijosService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');

    this.customerId$ = this.customerSelectService.getCustomerId$();
    this.fechaSolicitud = date.toISOString().slice(0, 10);
    this.onLoadData();
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
      .get<any[]>(
        'CatalogoGastosFijos/GetAll/' + this.customerSelectService.customerId
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
    this.dataService.delete(`CatalogoGastosFijos/${data.id}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }

  onModal(data: any) {
    this.catalogoGastosFijosService.setCatalogoGastosFijosId(data.id);

    this.ref = this.dialogService.open(ModalOrdenCompraGrastosFijosComponent, {
      data: {
        title: data.title,
      },
      header: '',
      width: '1400px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData();
    });
  }

  crearOrder(id: number, value: any) {
    this.dataService
      .get(`CatalogoGastosFijos/ValidarCreateOrder/${id}/${value}`)
      .subscribe(
        (resp) => {},
        (err) => {
          console.log(err.error);
        }
      );
  }

  createOrdenesCompra() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `OrdenCompra/GenerarOrdenCompraFijos/${this.fechaSolicitud}/${this.customerSelectService.customerId}`
      )
      .subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', `Proceso exitoso!`);
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error!!', 'Ocurrio un Error');
          Swal.close();
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
