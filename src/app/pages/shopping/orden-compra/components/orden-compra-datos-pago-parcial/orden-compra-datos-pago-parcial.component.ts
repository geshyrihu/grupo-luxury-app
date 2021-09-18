import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-orden-compra-datos-pago-parcial',
  templateUrl: './orden-compra-datos-pago-parcial.component.html',
})
export class OrdenCompraDatosPagoParcialComponent implements OnInit {
  @Input()
  ordenCompra: any;
  @Input()
  bloqueada: boolean;
  @Output()
  modalOrdenCompra: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onModalOrdenCompraDatosPago() {
    this.modalOrdenCompra.emit();
  }
}
