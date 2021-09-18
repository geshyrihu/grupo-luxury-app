import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
})
export class ButtonEditComponent {
  @Output()
  edit = new EventEmitter<any>();
  onEdit(value: any) {
    this.edit.emit(value);
  }
}
