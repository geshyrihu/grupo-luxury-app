import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-roles',
  templateUrl: './button-roles.component.html',
})
export class ButtonRolesComponent {
  @Output()
  editarRole = new EventEmitter<string>();
  constructor() {}

  onClick(event: string): void {
    return this.editarRole.emit(event);
  }
}
