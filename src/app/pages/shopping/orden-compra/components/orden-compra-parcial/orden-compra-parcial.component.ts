import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-compra-parcial',
  templateUrl: './orden-compra-parcial.component.html',
})
export class OrdenCompraParcialComponent implements OnInit {
  @Input()
  ordenCompra: any;
  @Input()
  bloqueada: boolean;
  @Input()
  solicitudCompraId: number = 0;
  @Output()
  modalOrdenCompra: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onModalOrdenCompra() {
    this.modalOrdenCompra.emit();
  }
}
