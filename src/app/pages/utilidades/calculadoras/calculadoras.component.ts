import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadoras',
  templateUrl: './calculadoras.component.html',
})
export class CalculadorasComponent implements OnInit {
  precioSinIva: number = 0;
  iva: number = 0;
  constructor() {}

  ngOnInit(): void {}

  calcularPrecioSinIva(event: any) {
    this.precioSinIva = event.value / 1.16;
    this.iva = (this.precioSinIva * 16) / 100;
  }
}
