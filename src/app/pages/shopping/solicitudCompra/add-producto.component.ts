import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth.service';
import { SelectlistService } from '../../../shared/services/selectlist.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { EProductClasificacion } from 'src/app/shared/enums/EProductClasificacion';
import { CrudProductosComponent } from '../../inventario/productos/crud-productos.component';
import { TarjetaProductoComponent } from '../../inventario/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-get-purchase-request',
  templateUrl: './add-producto.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class AddProductoComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  data: any[] = [];
  urlImagenProducto = environment.base_urlImg + 'Administration/products/';
  mensajeError = false;

  solicitudCompraId: number = 0;
  cb_unidadMedida: any[] = [];

  constructor(
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private selectListService: SelectlistService,
    private authService: AuthService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_unidadMedida = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    this.solicitudCompraId = this.config.data.solicitudCompraId;
    this.onLoadProduct();
  }

  onLoadProduct() {
    this.dataService
      .get(
        `SolicitudCompraDetalle/AddProductoToSolicitudDto/${this.solicitudCompraId}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onSubmit(item: any) {
    if (
      item.unidadMedidaId === 0 ||
      item.productoId === 0 ||
      item.cantidad === 0
    ) {
      this.mensajeError = true;
      return;
    }

    item.applicationUserId = this.authService.InfoUserAuthDto.id;
    this.dataService.post<any>(`SolicitudCompraDetalle/`, item).subscribe(
      (resp) => {
        this.showToast('success', 'Completado!!', 'Agregado...');
        this.mensajeError = false;
        this.onLoadProduct();

        // this.ref.close('Registro Agregado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  // ... Llamada al Modal agregar o editar
  showModalAddOrEdit() {
    this.ref.close();
    this.ref = this.dialogService.open(CrudProductosComponent, {
      data: {
        id: 0,
      },
      header: 'Crear Producto',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
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
