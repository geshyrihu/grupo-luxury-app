import { AuthService } from '../../../../shared/services/auth.service';
import { DataService } from '../../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { OrdenCompraService } from 'src/app/shared/services/orden-compra.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
const fechaActual = new Date();

@Component({
  selector: 'app-orden-compra-presupuesto',
  templateUrl: './orden-compra-presupuesto.component.html',
})
export class OrdenCompraPresupuestoComponent implements OnInit {
  anio: number = fechaActual.getFullYear();
  data: any[] = [];
  total: number = 0;
  ordenCompraId: number = 0;
  totalConRetencionIva = 0;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private ordenCompraService: OrdenCompraService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService
  ) {
    this.total = this.ordenCompraService.getTotalPorCubrir();

    this.ordenCompraId = this.config.data.ordenCompraId;
  }

  ngOnInit(): void {
    this.onLoadData();
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
        `OrdenCompraPresupuesto/GetAll/${this.authService.customerAuthId}/${this.anio}/${this.ordenCompraId}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          this.data.forEach(
            (x) => (
              (x.dineroUsado = this.total),
              (x.ordenCompraId = this.ordenCompraId)
            )
          );
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }
  onSubmit(partidaPresupuestal: any) {
    this.dataService
      .post(`OrdenCompraPresupuesto`, partidaPresupuestal)
      .subscribe(
        (resp) => {
          const valor =
            this.ordenCompraService.getTotalOrdenCompra() -
            partidaPresupuestal.gastoUsado;
          // this.ordenCompraService.setTotalCubierto(valor);
          this.ref.close('Actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  actualizarAnio() {
    const anioString = String(this.anio);
    if (anioString.length === 4) {
      this.onLoadData();
    } else {
      return;
    }
  }
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
