import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cedula-cliente',
  templateUrl: './cedula-cliente.component.html',
  providers: [DialogService, MessageService],
})
export class CedulaClienteComponent implements OnInit {
  data: any[] = [];
  customerId: number = 0;
  listCustomer: any[] = [];
  today = new Date();
  anio = 0;
  titulo = '';
  customerId$: Observable<number>;

  presupuestoMensual: number = 0;
  presupuestoEjercido: number = 0;
  presupuestoAcumulado: number = 0;
  presupuestoDisponible: number = 0;
  presupuestoAnual: number = 0;
  presupuestoRestanteAnio: number = 0;
  constructor(
    private dataService: DataService,
    private customerSelectService: CustomerSelectService
  ) {
    this.anio = this.today.getFullYear();
    this.titulo = `Cedula presupuestal ${this.anio}`;
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit() {
    this.customerId$.subscribe((resp) => {
      this.anio = this.today.getFullYear();
      this.titulo = `Cedula presupuestal ${this.anio}`;
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
      .get(
        `CedulaPresupuestal/GetCedulaPresupuestal/${this.customerSelectService.customerId}/${this.anio}`
      )
      .subscribe(
        (resp: any) => {
          if (resp.body) {
            this.data = resp.body.cedulaPresupuestalDetalles;
            let presupuestoMensual = 0;
            let presupuestoEjercido = 0;
            let presupuestoAcumulado = 0;
            let presupuestoDisponible = 0;
            let presupuestoAnual = 0;
            let presupuestoRestanteAnio = 0;

            for (let n of this.data) {
              presupuestoMensual += n.presupuestoMensual;
            }
            this.presupuestoMensual = presupuestoMensual;
            for (let n of this.data) {
              presupuestoEjercido += n.presupuestoEjercido;
            }
            this.presupuestoEjercido = presupuestoEjercido;
            for (let n of this.data) {
              presupuestoAcumulado += n.presupuestoAcumulado;
            }
            this.presupuestoAcumulado = presupuestoAcumulado;
            for (let n of this.data) {
              presupuestoDisponible += n.presupuestoDisponible;
            }
            this.presupuestoDisponible = presupuestoDisponible;
            for (let n of this.data) {
              presupuestoAnual += n.presupuestoAnual;
            }
            this.presupuestoAnual = presupuestoAnual;
            for (let n of this.data) {
              presupuestoRestanteAnio += n.presupuestoRestanteAnio;
            }
            this.presupuestoRestanteAnio = presupuestoRestanteAnio;
          }
          Swal.close();
        },
        (err) => {
          console.log(err.error);
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: err.error,
          });
        }
      );
    Swal.close();
  }
}
