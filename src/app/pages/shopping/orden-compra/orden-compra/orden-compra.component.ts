import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalOrdenCompraComponent } from './modal-orden-compra.component';
import { OrdenCompraDatosPagoComponent } from '../orden-compra-datos-pago/orden-compra-datos-pago.component';
import { OrdenCompraDenegadaComponent } from './../orden-compra-denegada/orden-compra-denegada.component';
import { OrdenCompraService } from 'src/app/shared/services/orden-compra.service';
import { OrdenCompraStatusComponent } from '../orden-compra-status/orden-compra-status.component';
import { OrdenCompraPresupuestoComponent } from '../orden-compra-presupuesto/orden-compra-presupuesto.component';
import { OrdenCompraDetalleAddProductoComponent } from '../orden-compra-detalle-add-producto/orden-compra-detalle-add-producto.component';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class OrdenCompraComponent implements OnInit {
  isSupervisionOperativa = false;
  isResidente = false;
  ref: DynamicDialogRef;

  ordenCompraId: number = 0;
  ordenCompra: any;
  ordenCompraPresupuestoUtilizado: any[] = [];
  ordenCompraDetalle: any[] = [];
  nombreAutorizador = '';

  userId: string = '';

  presupuestoTomado = new PresupuestoTomado();
  ordenCompraEstaAutorizada: boolean = false;

  solicitudCompraId: number = 0;
  esNumeroNegativo = false;
  totalRelacionadoConOtrasOrdenes: number = 0;
  totalOrdenCompra = 0;
  totalCubrir: number = 0;
  // Nuevos var
  iva: number = 0;
  retencionIva: number = 0;
  subtotal: number = 0;
  cb_unidadMedida: any[] = [];
  revisadaPorResidente: boolean = false;
  icon: string;

  esGastoFijo: boolean = false;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private routeActive: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    public ordenCompraService: OrdenCompraService,
    private selectListService: SelectlistService
  ) {
    this.ordenCompraId = this.routeActive.snapshot.params.id;
    this.userId = this.authService.InfoUserAuthDto.id;

    this.isSupervisionOperativa = this.authService.validationRole(
      'SupervisionOperativa'
    );
    this.selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_unidadMedida = resp;
    });
    this.isResidente = this.authService.validationRole('Residente');
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  validarOrdenesCompraMismoFolioSolicituCompra() {
    this.dataService
      .get(
        'OrdenCompra/ValidarOrdenesCompraMismoFolioSolicituCompra/' +
          this.ordenCompraId
      )
      .subscribe((resp: any) => {
        this.totalRelacionadoConOtrasOrdenes = resp.body;
      });
  }

  onLoadData() {
    this.esGastoFijo = false;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get(`OrdenCompra/${this.ordenCompraId}`).subscribe(
      (resp: any) => {
        this.ordenCompra = resp.body;
        if (this.ordenCompra.ordenCompraDatosPago.tipoGasto === 0) {
          this.esGastoFijo = true;
        }
        this.ordenCompraDetalle = this.ordenCompra.ordenCompraDetalle;
        this.ordenCompraPresupuestoUtilizado =
          this.ordenCompra.ordenCompraPresupuestoUtilizado;
        this.ordenCompraService.actualizarTotalOrdenCompra(this.ordenCompraId);
        this.cargarTotalesOrdenCompra();

        //... Obtener Id SolicitudCompra

        if (this.ordenCompra.folioSolicitudCompra) {
          this.dataService
            .get(
              `SolicitudCompra/GetIdSolicitudCompra/${this.ordenCompra.folioSolicitudCompra}/${this.ordenCompra.customerId}`
            )
            .subscribe((resp: any) => {
              this.solicitudCompraId = resp.body;
            });
        }
        //...Fin Obtener Id SolicitudCompra

        //   Validando si ya fue revisada por el Residente

        if (this.ordenCompra.ordenCompraAuth.revisadoPorResidente) {
          this.revisadaPorResidente = true;
        } else {
          this.revisadaPorResidente = false;
        }
        //   Fin Validando si ya fue revisada por el Residente

        if (this.ordenCompra.ordenCompraAuth.statusOrdenCompra === 0) {
          this.ordenCompraEstaAutorizada = true;
        }
        if (
          this.ordenCompra.ordenCompraAuth.statusOrdenCompra === 1 ||
          this.ordenCompra.ordenCompraAuth.statusOrdenCompra === 2
        ) {
          this.ordenCompraEstaAutorizada = false;
        }
        if (this.ordenCompra.ordenCompraAuth.applicationUserAuthId !== null) {
          this.nombreAutorizador = `${this.ordenCompra.ordenCompraAuth.applicationUserAuthId} `;
        }

        if (this.ordenCompraService.getTotalPorCubrir() < 0) {
          this.esNumeroNegativo = true;
        }

        // Buscar Ordenes de compra relacionadas
        if (this.ordenCompra.folioSolicitudCompra) {
          this.validarOrdenesCompraMismoFolioSolicituCompra();
        }
        // Fin Buscar Ordenes de compra relacionadas

        Swal.close();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al cargar la información');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  autorizarCompra() {
    this.dataService
      .get(`OrdenCompraAuth/Autorizar/${this.ordenCompraId}/${this.userId}`)
      .subscribe(
        (resp) => {
          this.onLoadData();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  deautorizarCompra() {
    this.dataService
      .get(`OrdenCompraAuth/Desautorizar/${this.ordenCompraId}/${this.userId}`)
      .subscribe(
        (resp) => {
          this.nombreAutorizador = '';
          this.onLoadData();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  //... Modales

  onModalOrdenCompra() {
    this.ref = this.dialogService.open(ModalOrdenCompraComponent, {
      data: {
        ordenCompra: this.ordenCompra,
      },
      header: 'Actualizar información',
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
  onModalOrdenCompraDatosPago() {
    this.ref = this.dialogService.open(OrdenCompraDatosPagoComponent, {
      data: {
        ordenCompra: this.ordenCompra,
      },
      header: 'Autorizar Datos de pago',
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
  onModalOrdenCompraStatus() {
    this.ref = this.dialogService.open(OrdenCompraStatusComponent, {
      data: {
        ordenCompraId: this.ordenCompraId,
      },
      header: 'Autorizar Status de Orden de compra',
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
  onModalOrdenCompraPresupuesto() {
    this.ref = this.dialogService.open(OrdenCompraPresupuestoComponent, {
      data: {
        ordenCompraId: this.ordenCompraId,
      },
      header: '',
      width: '1600px',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp === 'Actualizado') {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  onModalAgregarproducto() {
    this.ref = this.dialogService.open(OrdenCompraDetalleAddProductoComponent, {
      data: {
        ordenCompraId: this.ordenCompraId,
      },
      header: 'Agregar ',
      styleClass: 'anchoModal',
      width: 'auto',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  onModalcompraNoAutorizada() {
    this.ref = this.dialogService.open(OrdenCompraDenegadaComponent, {
      data: {
        ordenCompraId: this.ordenCompra.id,
        ordenCompraAuthId: this.ordenCompra.ordenCompraAuth.id,
      },
      header: 'Denegar Orden de Compra',
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
  //... Fin Modales
  onCuadroComparativo(idSolicitudCompra: number) {
    this.router.navigateByUrl(
      `shopping/cuadroComparativo/${idSolicitudCompra}`
    );
  }
  // ... Editar presupeusto del que se va a disponer
  onEditOrdenCompraPresupuesto(item: any): void {
    this.dataService.put(`OrdenCompraPresupuesto/${item.id}`, item).subscribe(
      (resp) => {
        this.onLoadData();
        this.showToast('success', 'Completado!!', 'Actualizado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  onDeleteOrdenCompraPresupuesto(id: number): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`OrdenCompraPresupuesto/${id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro Borrado!`);
        this.onLoadData();
        Swal.close();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
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

  onRevisadaPorResidente() {
    const revisadoPorResidente = new RevisadoPorResidente();

    if (this.revisadaPorResidente) {
      revisadoPorResidente.revisadoPorResidente = !this.revisadaPorResidente;
      this.dataService
        .put(
          `OrdenCompra/RevisadoPorResidente/${this.ordenCompraId}/${this.authService.InfoUserAuthDto.id}`,
          revisadoPorResidente
        )
        .subscribe(
          (resp) => {
            this.onLoadData();
            // this.revisadaPorResidente = !this.revisadaPorResidente;
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      Swal.fire({
        title:
          '¿Confirmas haber revisado correctamente los datos de esta orden de compra?',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          revisadoPorResidente.revisadoPorResidente =
            !this.revisadaPorResidente;
          this.dataService
            .put(
              `OrdenCompra/RevisadoPorResidente/${this.ordenCompraId}/${this.authService.InfoUserAuthDto.id}`,
              revisadoPorResidente
            )
            .subscribe(
              (resp) => {
                this.onLoadData();
                // this.revisadaPorResidente = !this.revisadaPorResidente;
              },
              (err) => {
                console.log(err.error);
              }
            );
        } else if (result.isDenied) {
        }
      });
    }
  }

  onDeleteProduct(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`OrdenCompraDetalle/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro Borrado!`);
        this.onLoadData();
        Swal.close();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }
  onSubmitProducto(item: any): void {
    const data = {
      cantidad: item.cantidad,
      descuento: item.descuento,
      id: item.id,
      iva: item.iva,
      ivaAplicado: item.ivaAplicado,
      ordenCompraId: item.ordenCompraId,
      precio: item.precio,
      productoId: item.productoId,
      subTotal: item.subTotal,
      total: item.total,
      unidadMedidaId: item.unidadMedidaId,
    };
    this.dataService.put(`OrdenCompraDetalle/${item.id}`, data).subscribe(
      (resp) => {
        this.onLoadData();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  cargarTotalesOrdenCompra() {
    let subTotal = 0;
    let retencionIva = 0;
    let ivaTotal = 0;
    for (let n of this.ordenCompraDetalle) {
      subTotal += n.subTotal;
      if (n.unidadMedidaId === 14) {
        retencionIva += n.subTotal;
      }
    }
    for (let n of this.ordenCompraDetalle) {
      ivaTotal += n.iva;
    }

    this.retencionIva = retencionIva * 0.06;
    this.subtotal = subTotal;
    this.iva = ivaTotal;
    this.subtotal = subTotal;
    this.totalOrdenCompra = this.subtotal + this.iva - this.retencionIva;
  }
}
class RevisadoPorResidente {
  revisadoPorResidente: boolean;
}

class PresupuestoTomado {
  descripccion: string;
  presupuestoDisponible: number;
  presupuestoTomado: number;
  hayRecurso: boolean;
}
