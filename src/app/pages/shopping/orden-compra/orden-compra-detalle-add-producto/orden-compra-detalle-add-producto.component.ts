import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/shared/services/data.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { CrudProductosComponent } from 'src/app/pages/inventario/productos/crud-productos.component';

@Component({
  selector: 'app-orden-compra-detalle-add-producto',
  templateUrl: './orden-compra-detalle-add-producto.component.html',
})
export class OrdenCompraDetalleAddProductoComponent implements OnInit {
  isInRole: boolean;
  ordenCompraId: number = 0;
  data: any[] = [];
  urlImagenProducto = environment.base_urlImg + 'Administration/products/';
  mensajeError = false;

  id: any;
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
    this.ordenCompraId = this.config.data.ordenCompraId;
    this.onLoadProduct();
  }

  onLoadProduct() {
    this.dataService
      .get(`OrdenCompraDetalle/AddProductoToOrder/${this.ordenCompraId}`)
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
    if (item.unidadMedidaId === 0 || item.productoId === 0) {
      this.mensajeError = true;
      return;
    }

    item.applicationUserId = this.authService.InfoUserAuthDto.id;
    this.dataService.post<any>(`OrdenCompraDetalle/`, item).subscribe(
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
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
