import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdenCompraService } from 'src/app/shared/services/orden-compra.service';

@Component({
  selector: 'app-orden-compra-auth-parcial',
  templateUrl: './orden-compra-auth-parcial.component.html',
})
export class OrdenCompraAuthParcialComponent implements OnInit {
  @Input()
  ordenCompra: any;
  @Input()
  bloqueada: boolean;

  @Input()
  mostarBotonAutorizarSup: boolean;
  @Input()
  mostarBotonAutorizarRes: boolean;

  @Input()
  mostarBotonRevocar: boolean;

  @Input()
  isSupervisionOperativa: boolean;

  @Output()
  modalOrdenCompra: EventEmitter<string> = new EventEmitter();
  @Output()
  ModalcompraNoAutorizada: EventEmitter<string> = new EventEmitter();

  @Output()
  onBotonAutorizarSup: EventEmitter<string> = new EventEmitter();
  @Output()
  onBotonAutorizarRes: EventEmitter<string> = new EventEmitter();
  @Output()
  onBotonNoAutorizada: EventEmitter<string> = new EventEmitter();

  constructor(public ordenCompraService: OrdenCompraService) {}

  ngOnInit(): void {}
  onModalOrdenCompra() {
    this.modalOrdenCompra.emit();
  }
  onModalcompraNoAutorizada() {}
}
