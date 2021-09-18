import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfSolicitudCompraService {
  idSolicitudCompra: number = 0;
  folioCotizacion = '';
  constructor() {}

  getidSolicitudCompra(): number {
    return this.idSolicitudCompra;
  }
  setidSolicitudCompra(id: number) {
    this.idSolicitudCompra = id;
  }

  getfolioCotizacion() {
    return this.folioCotizacion;
  }
  setfolioCotizacion(folioCotizacion: string) {
    this.folioCotizacion = folioCotizacion;
  }
}
