import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formDateToString } from 'src/app/shared/helpers/utilities';

const date = new Date();
const mesActual = date.getMonth();
const mesAnterior = new Date(date.getFullYear(), mesActual - 1, 1);
@Component({
  selector: 'app-d-card-title',
  templateUrl: './d-card-title.component.html',
})
export class DCardTitleComponent implements OnInit {
  // fechaInicial = new Date(date.getFullYear(), this.mesActual - 1, 1);
  fechaInicial = formDateToString(mesAnterior);
  fechaFinal = formDateToString(date);
  @Output()
  change = new EventEmitter();

  onChange() {
    return this.change.emit({
      fechaInicial: this.fechaInicial,
      fechaFinal: this.fechaFinal,
    });
  }
  constructor() {}

  ngOnInit(): void {}
}
