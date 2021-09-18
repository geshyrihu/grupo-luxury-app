import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  providers: [ConfirmationService, MessageService],
})
export class ButtonDeleteComponent {
  @Input()
  nameItem: string;

  @Output()
  OnConfirm = new EventEmitter<any>();
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm(event: EventEmitter<any>): void {
    this.confirmationService.confirm({
      message: `
        <p>¿Estás segura de que quieres eliminar el siguiente registro?</p>
        <p>${this.nameItem}</p>
    `,
      accept: () => {
        return this.OnConfirm.emit(event);
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelado',
          detail: 'Operación cancelada',
        });
      },
    });
  }
}
