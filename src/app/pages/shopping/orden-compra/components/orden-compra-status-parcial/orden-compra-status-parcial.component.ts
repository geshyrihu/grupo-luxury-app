import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-orden-compra-status-parcial',
  templateUrl: './orden-compra-status-parcial.component.html',
})
export class OrdenCompraStatusParcialComponent implements OnInit {
  @Input()
  ordenCompra: any;
  @Input()
  mostrarTabla: boolean;
  @Input()
  ordenCompraPresupuestoUtilizado: boolean;
  @Output()
  modalOrdenCompra: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onModalOrdenCompraStatus() {
    this.modalOrdenCompra.emit();
  }
}
