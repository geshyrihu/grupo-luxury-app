import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  totalOrdenCompra: number = 0;
  totalCubierto: number = 0;
  totalPorCubrir: number = 0;

  statusCompras: number = 2;

  constructor(private dataService: DataService) {}

  getTotalOrdenCompra(): number {
    return this.totalOrdenCompra;
  }
  getTotalCubierto(): number {
    return this.totalCubierto;
  }
  getTotalPorCubrir(): number {
    return this.totalPorCubrir;
  }

  actualizarTotalOrdenCompra(ordenCompraId: number) {
    this.totalOrdenCompra = 0;
    this.totalCubierto = 0;
    this.totalPorCubrir = 0;

    this.dataService
      .get(`OrdenCompraDetalle/GetAllTotal/${ordenCompraId}`)
      .subscribe(
        (resp: any) => {
          for (let n of resp.body) {
            this.totalOrdenCompra += n.total;
          }

          this.dataService
            .get(
              `OrdenCompraPresupuesto/GetAllForOrdenCompraTotal/${ordenCompraId}`
            )
            .subscribe(
              (resp: any) => {
                for (let n of resp.body) {
                  this.totalCubierto += n.dineroUsado;
                }

                this.totalPorCubrir =
                  Math.round(
                    (this.totalOrdenCompra - this.totalCubierto) * 100
                  ) / 100;
              },
              (err) => {
                console.log(err.error);
              }
            );
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  //... Estatus de compras

  setStatusCompras(statusCompras: number): void {
    this.statusCompras = statusCompras;
  }

  getStatusCompras(): number {
    return this.statusCompras;
  }
}
