import { AddProductosComponent } from './add-productos.component';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudInventarioProductosComponent } from './crud-inventario-productos.component';
import { CrudSalidasComponent } from '../salidas/crud-salidas.component';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { FormEntradasComponent } from '../entradas/form-entradas/form-entradas.component';
import { Observable } from 'rxjs';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

const urlImgBase = environment.base_urlImg;

@Component({
  selector: 'app-index-inventario-productos',
  templateUrl: './index-inventario-productos.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexInventarioProductosComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;
  urlImgBase = urlImgBase + 'Administration/products/';
  customerId$: Observable<number>;

  rowGroupMetadata: any;

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
  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }
  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        let rowData = this.data[i];
        let representativeName = rowData.category;
        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.data[i - 1];
          let previousRowGroup = previousRowData.category;
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
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
        'InventarioProducto/GetAsyncAll/' +
          this.customerSelectService.customerId
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          this.updateRowGroupMetaData();
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
    this.dataService.delete(`InventarioProducto/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro Borrado!`);
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

  editProductos(data: any) {
    this.ref = this.dialogService.open(CrudInventarioProductosComponent, {
      data: {
        id: data.id,
        idProducto: data.idProducto,
      },
      header: data.title,
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  addProductos(data: any) {
    this.ref = this.dialogService.open(AddProductosComponent, {
      data: {
        id: data.id,
        idProducto: data.idProducto,
      },
      header: data.title,
      height: 'auto',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();
      if (resp !== undefined) {
        this.onLoadData();

        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  onAddEntrada(data: any) {
    this.ref = this.dialogService.open(FormEntradasComponent, {
      data: {
        id: 0,
        idProducto: data.idProducto,
        nombreProducto: data.nombreProducto,
      },
      header: 'Entrada de Productos',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  onAddSalida(data: any) {
    this.ref = this.dialogService.open(CrudSalidasComponent, {
      data: {
        id: data.id,
        idInventarioProducto: data.idInventarioProducto,
        idProducto: data.idProducto,
        nombreProducto: data.nombreProducto,
      },
      header: 'Salida de Productos',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  onModalTarjetaProducto(productoId: number): void {
    this.ref = this.dialogService.open(TarjetaProductoComponent, {
      data: {
        productoId: productoId,
      },
      header: 'Tarjeta de Producto',
      width: '1000px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
