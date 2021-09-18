import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
})
export class ButtonSubmitComponent {
  @Input()
  enviando: boolean = false;
  @Input()
  disabled: boolean;
  @Input()
  nameLabel = 'Guardar';
  @Input()
  icon = 'pi pi-check';
}
