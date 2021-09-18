import { Component } from '@angular/core';
import { CatalogoGastosFijosService } from 'src/app/shared/services/catalogo-gastos-fijos.service';

@Component({
  selector: 'app-modal-orden-compra-grastos-fijos',
  templateUrl: './modal-orden-compra-grastos-fijos.component.html',
})
export class ModalOrdenCompraGrastosFijosComponent {
  constructor(public catalogoGastosFijosService: CatalogoGastosFijosService) {}
}
