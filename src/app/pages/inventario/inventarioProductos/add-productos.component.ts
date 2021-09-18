import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  providers: [DialogService, MessageService],
})
export class AddProductosComponent implements OnInit {
  data: any[] = [];
  cb_UnidadMedida: any[] = [];
  mensajeError = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private selectListService: SelectlistService,
    public ref: DynamicDialogRef,
    public dialogService: DialogService
  ) {
    this.selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_UnidadMedida = resp;
    });
  }

  ngOnInit(): void {
    this.onLoadData();
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

  onLoadData() {
    this.dataService
      .get(
        `InventarioProducto/GetProductoDropdownDto/${this.authService.customerAuthId}`
      )
      .subscribe((resp: any) => {
        this.data = resp.body;
        Swal.close();
      }),
      (err) => {
        console.log(err.error);
      };

    Swal.close();
  }
  onSubmit(item: IProductoListAddDto) {
    item.applicationUserId = this.authService.InfoUserAuthDto.id;
    item.customerId = this.authService.customerAuthId;

    if (
      item.existencia < 0 ||
      item.unidadDeMedidaId == 0 ||
      item.stockMax == 0 ||
      item.stockMin == 0
    ) {
      this.mensajeError =
        'Completa todos los campos :Existencia, Unidad, Stok Max,   Stok Min';
      return;
    }
    this.dataService.post(`InventarioProducto/`, item).subscribe(
      (resp) => {
        this.mensajeError = '';
        this.onLoadData();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
export interface IProductoListAddDto {
  id: number;
  customerId: number;
  productoId: number;
  nombreProducto: string;
  existencia: number;
  unidadDeMedidaId: number;
  stockMin: number;
  stockMax: number;
  applicationUserId: string;
}
