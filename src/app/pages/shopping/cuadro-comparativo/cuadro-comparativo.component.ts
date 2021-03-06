import { ModalAddProveedorComponent } from './modal-add-proveedor/modal-add-proveedor.component';
import { DataService } from '../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ModalEditCotizacionComponent } from './modal-edit-cotizacion/modal-edit-cotizacion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuadro-comparativo',
  templateUrl: './cuadro-comparativo.component.html',
  providers: [ConfirmationService, DialogService, MessageService],
})
export class CuadroComparativoComponent implements OnInit {
  ref: DynamicDialogRef;
  solicitudCompra: any;
  solicitudCompraDetalle: any[];
  cotizacionProveedor: any[] = [];

  provider1: any;
  provider2: any;
  provider3: any;

  total1 = 0;
  total2 = 0;
  total3 = 0;

  amarilloTotal1 = false;
  amarilloTotal2 = false;
  amarilloTotal3 = false;

  solicitudCompraId: number;
  folio = '';

  constructor(
    private dataService: DataService,
    private routeActive: ActivatedRoute,
    public dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.routeActive.params.subscribe((resp) => {
      this.solicitudCompraId = resp['id'];
    });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onModalAddProveedor() {
    this.ref = this.dialogService.open(ModalAddProveedorComponent, {
      data: {
        solicitudCompraId: this.solicitudCompraId,
      },
      header: 'Selecciona un proveedor',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onResetTotal();
      this.onLoadData();
      if (resp !== undefined) {
        this.showToast('success', 'Completado!!', resp);
      }
    });
    this.onResetTotal();
    this.onLoadData();
  }
  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando informaci??n...',
    });
    Swal.showLoading();
    this.onResetProvider();
    this.dataService
      .get<any>(`SolicitudCompra/CuadroComparativo/${this.solicitudCompraId}`)
      .subscribe(
        (resp: any) => {
          this.folio = resp.body.folio;
          this.solicitudCompra = resp.body;
          this.cotizacionProveedor = this.solicitudCompra.cotizacionProveedor;
          this.solicitudCompraDetalle =
            this.solicitudCompra.solicitudCompraDetalle;

          if (this.cotizacionProveedor.length === 1) {
            this.provider1 = this.cotizacionProveedor[0].provider;
            for (let n of this.solicitudCompraDetalle) {
              this.total1 += n.total;
            }
          }
          if (this.cotizacionProveedor.length === 2) {
            this.provider1 = this.cotizacionProveedor[0].provider;
            this.provider2 = this.cotizacionProveedor[1].provider;
            for (let n of this.solicitudCompraDetalle) {
              this.total1 += n.total;
            }
            for (let n of this.solicitudCompraDetalle) {
              this.total2 += n.total2;
            }
          }
          if (this.cotizacionProveedor.length === 3) {
            this.provider1 = this.cotizacionProveedor[0].provider;

            this.provider2 = this.cotizacionProveedor[1].provider;

            this.provider3 = this.cotizacionProveedor[2].provider;

            for (let n of this.solicitudCompraDetalle) {
              this.total1 += n.total;
            }
            for (let n of this.solicitudCompraDetalle) {
              this.total2 += n.total2;
            }
            for (let n of this.solicitudCompraDetalle) {
              this.total3 += n.total3;
            }
          }
          this.onEvaluationPriceTotal();
          this.ontotalPreciosMenores(this.solicitudCompraDetalle);
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la informaci??n');
          console.log(err.error);
          Swal.close();
        }
      );
  }

  onEditCotizacion(posicionCotizacion: number) {
    this.ref = this.dialogService.open(ModalEditCotizacionComponent, {
      data: {
        solicitudCompraId: this.solicitudCompraId,
        posicionCotizacion: posicionCotizacion,
      },
      width: '90%',
      header: 'Editar Cotizaci??n',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onResetTotal();
      this.onLoadData();
      if (resp !== undefined) {
        this.showToast('success', 'Actualizado!!', resp);
      }
    });
  }

  onResetProvider(): void {
    this.provider1 = undefined;
    this.provider2 = undefined;
    this.provider3 = undefined;
  }
  onResetTotal() {
    this.total1 = 0;
    this.total2 = 0;
    this.total3 = 0;
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  onEvaluationPriceTotal(): void {
    this.amarilloTotal1 = false;
    this.amarilloTotal2 = false;
    this.amarilloTotal3 = false;
    this.onMejorOpcion1();
    this.onMejorOpcion2();
    this.onMejorOpcion3();
  }

  onMejorOpcion1(): void {
    if (
      this.total1 !== 0 &&
      this.solicitudCompra.cotizacionProveedor.length === 3
    ) {
      if (this.total3 === 0) {
        if (this.total2 > this.total1) {
          this.amarilloTotal1 = true;
        }
      } else if (this.total2 === 0) {
        if (this.total3 > this.total1) {
          this.amarilloTotal1 = true;
        }
      } else if (this.total3 !== 0) {
        if (this.total2 > this.total1 && this.total3 > this.total1) {
          this.amarilloTotal1 = true;
        }
      }
    }
    if (
      this.total1 !== 0 &&
      this.solicitudCompra.cotizacionProveedor.length === 2
    ) {
      if (this.total2 > this.total1) {
        this.amarilloTotal1 = true;
      }
    }
  }
  onMejorOpcion2(): void {
    if (
      this.total2 !== 0 &&
      this.solicitudCompra.cotizacionProveedor.length === 3
    ) {
      if (this.total3 === 0) {
        if (this.total1 > this.total2) {
          this.amarilloTotal2 = true;
        }
      } else if (this.total1 === 0) {
        if (this.total3 > this.total2) {
          this.amarilloTotal2 = true;
        }
      } else if (this.total3 !== 0 && this.total1 !== 0) {
        if (this.total2 < this.total1 && this.total2 < this.total3) {
          this.amarilloTotal2 = true;
        }
      }
    }
    if (this.total2 !== 0) {
      if (this.total3 === 0) {
        if (this.total1 > this.total2) {
          this.amarilloTotal2 = true;
        }
      } else if (this.total1 === 0) {
        if (this.total3 > this.total2) {
          this.amarilloTotal2 = true;
        }
      } else if (this.total3 !== 0 && this.total1 !== 0) {
        if (this.total2 < this.total1 && this.total2 < this.total3) {
          this.amarilloTotal2 = true;
        }
      }
    }
    if (
      this.total2 !== 0 &&
      this.solicitudCompra.cotizacionProveedor.length === 2
    ) {
      if (this.total1 > this.total2) {
        this.amarilloTotal2 = true;
      }
    }
  }
  onMejorOpcion3(): void {
    if (this.total3 !== 0) {
      if (this.total1 === 0) {
        if (this.total2 > this.total3) {
          this.amarilloTotal3 = true;
        }
      } else if (this.total2 === 0) {
        if (this.total1 > this.total3) {
          this.amarilloTotal3 = true;
        }
      } else if (this.total1 !== 0 && this.total2 !== 0) {
        if (this.total3 < this.total1 && this.total3 < this.total2) {
          this.amarilloTotal3 = true;
        }
      }
    }
  }

  mejorPrecioTotal1: number = 0;
  mejorPrecioTotal2: number = 0;
  mejorPrecioTotal3: number = 0;
  totalMejorPrecioTotal: number = 0;
  evaluarPrecioIndependiente = false;

  ontotalPreciosMenores(solicitudCompraDetalle: any[]): void {
    this.onResetMejorPrecio();
    if (this.solicitudCompra.cotizacionProveedor.length === 3) {
      for (let n of solicitudCompraDetalle) {
        if (n.total < n.total2 && n.total < n.total3) {
          this.mejorPrecioTotal1 += n.total;
        }
      }
      for (let n of solicitudCompraDetalle) {
        if (n.total2 < n.total && n.total2 < n.total3) {
          this.mejorPrecioTotal2 += n.total2;
        }
      }
      for (let n of solicitudCompraDetalle) {
        if (n.total3 < n.total && n.total3 < n.total2) {
          this.mejorPrecioTotal3 += n.total3;
        }
      }
      this.totalMejorPrecioTotal =
        this.mejorPrecioTotal1 +
        this.mejorPrecioTotal2 +
        this.mejorPrecioTotal3;
    }
    if (this.solicitudCompra.cotizacionProveedor.length === 2) {
      for (let n of solicitudCompraDetalle) {
        if (n.total < n.total2) {
          this.mejorPrecioTotal1 += n.total;
        }
      }
      for (let n of solicitudCompraDetalle) {
        if (n.total2 < n.total) {
          this.mejorPrecioTotal2 += n.total2;
        }
      }

      this.totalMejorPrecioTotal =
        this.mejorPrecioTotal1 + this.mejorPrecioTotal2;
    }
  }

  onResetMejorPrecio() {
    this.mejorPrecioTotal1 = 0;
    this.mejorPrecioTotal2 = 0;
    this.mejorPrecioTotal3 = 0;
    this.totalMejorPrecioTotal = 0;
  }
}
