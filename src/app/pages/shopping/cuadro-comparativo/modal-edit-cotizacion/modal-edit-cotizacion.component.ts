import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { MessageService, SelectItem } from 'primeng/api';
import { CreateOrdenCompraComponent } from '../../orden-compra/orden-compra/create-orden-compra/create-orden-compra.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-cotizacion',
  templateUrl: './modal-edit-cotizacion.component.html',
  providers: [DialogService, MessageService],
})
export class ModalEditCotizacionComponent implements OnInit {
  cotizacionProveedorId = 0;
  cotizacionProveedor: any;
  solicitudCompra: any;
  solicitudCompraDetalle: any;
  solicitudCompraId = 0;
  providerId = 0;
  posicionCotizacion: number = 0;
  cb_Proveedor: any[] = [];
  proveedor: SelectItem;
  proveedorResult: any[] = [];
  cotizacionesRelacionadas: any[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private dataService: DataService,
    private selectListService: SelectlistService,
    public dialogService: DialogService,
    public messageService: MessageService,

    private router: Router
  ) {
    this.solicitudCompraId = this.config.data.solicitudCompraId;
    this.posicionCotizacion = this.config.data.posicionCotizacion;
    this.onLoadSelectItemProvider();
  }

  ngOnInit(): void {
    this.onGetCotizacioProveedor();
    this.onLoadData();
    this.onCotizacionesRelacionadas();
  }

  onLoadSelectItemProvider() {
    this.dataService
      .get('CotizacionProveedor/GetProviders/' + this.solicitudCompraId)
      .subscribe(
        (resp: any) => {
          this.cb_Proveedor = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  filtrarProveedor(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_Proveedor.length; i++) {
      let country = this.cb_Proveedor[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.proveedorResult = filtered;
  }
  onGetCotizacioProveedor() {
    this.dataService
      .get<any>(
        `CotizacionProveedor/GetPosicionCotizacion/${this.solicitudCompraId}/${this.posicionCotizacion}`
      )
      .subscribe((resp: any) => {
        this.cotizacionProveedor = resp.body;
        this.providerId = resp.body.providerId;
        this.proveedor = {
          label: resp.body.provider,
          value: resp.body.providerId,
        };
      });
  }
  onLoadData() {
    this.dataService
      .get<any>(`SolicitudCompra/${this.solicitudCompraId}`)
      .subscribe(
        (resp) => {
          this.solicitudCompra = resp.body;
          this.solicitudCompraDetalle = resp.body.solicitudCompraDetalle;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onUpdateProvider(providerId: number) {
    this.cotizacionProveedor.providerId = providerId;
    this.dataService
      .put(
        `CotizacionProveedor/UpdateProvider/${this.cotizacionProveedor.id}`,
        this.cotizacionProveedor
      )
      .subscribe(
        (resp) => {
          this.showToast('success', 'Proveedor Actualizado!!');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onChange(item: any) {
    const data = {
      applicationUserId: item.applicationUserId,
      cantidad: item.cantidad,
      descuento: item.descuento,
      descuento2: item.descuento2,
      descuento3: item.descuento3,
      id: item.id,
      iva: item.iva,
      iva2: item.iva2,
      iva3: item.iva3,
      ivaAplicado: item.ivaAplicado,
      ivaAplicado2: item.ivaAplicado2,
      ivaAplicado3: item.ivaAplicado3,
      precio: item.precio,
      precio2: item.precio2,
      precio3: item.precio3,
      productoId: item.productoId,
      solicitudCompraId: item.solicitudCompraId,
      subTotal: item.subTotal,
      subTotal2: item.subTotal2,
      subTotal3: item.subTotal3,
      total: item.total,
      total2: item.total2,
      total3: item.total3,
      unidadMedidaId: item.unidadMedidaId,
    };
    this.dataService
      .put(`SolicitudCompraDetalle/UpdatePrice/${item.id}`, data)
      .subscribe(
        (resp) => {
          this.onLoadData();
          this.showToast('success', 'Guardado!!');
        },
        (err) => {
          this.showToast('error', 'Ocurrio un Error!!');

          console.log(err.error);
        }
      );
  }

  onDeleteProvider() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService
      .delete(
        `solicitudCompra/DeleteProvider/${this.solicitudCompraId}/${this.providerId}`
      )
      .subscribe(
        (resp) => {
          this.ref.close('Cotización Eliminada');
          Swal.close();
        },
        (err) => {
          Swal.close();
          console.log(err.error);
        }
      );
  }
  onModalCreateOrdenCompra() {
    this.ref.close();
    this.ref = this.dialogService.open(CreateOrdenCompraComponent, {
      data: {
        solicitudCompraId: this.solicitudCompra.id,
        folioSolicitudCompra: this.solicitudCompra.folio,
        proveedorId: this.cotizacionProveedor.providerId,
        posicionCotizacion: this.posicionCotizacion,
      },
      header: 'Crear Orden de compra',
      width: '1000px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((ordenCompraId: number) => {
      if (ordenCompraId !== undefined) {
        this.router.navigateByUrl(`shopping/ordenCompra/${ordenCompraId}`);
      }
    });
  }

  onCotizacionesRelacionadas() {
    this.dataService
      .get(`OrdenCompra/CotizacionesRelacionadas/${this.solicitudCompraId}`)
      .subscribe(
        (resp: any) => {
          this.cotizacionesRelacionadas = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  showToast(severity: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      life: 1000,
    });
  }
}
