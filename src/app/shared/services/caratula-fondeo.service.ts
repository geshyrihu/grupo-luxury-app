import { Injectable } from '@angular/core';
import {
  FondeoDto,
  FondeoPdfDto,
} from 'src/app/pages/shopping/caratula-fondeo/caratula.interface';

@Injectable({
  providedIn: 'root',
})
export class CaratulaFondeoService {
  data: FondeoPdfDto;
  cuenta: string = '';
  datosPago: string = '';
  entregadoPor: string = '';
  constructor() {}

  getData(): FondeoPdfDto {
    return this.data;
  }

  setData(data: FondeoPdfDto) {
    this.data = data;
  }

  setInfo(data: string, datosPago: string, EntregadoPor: string) {
    this.cuenta = data;
    this.datosPago = datosPago;
    this.entregadoPor = EntregadoPor;
  }
}
