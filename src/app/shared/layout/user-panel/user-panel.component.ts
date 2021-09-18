import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoUserAuthDto } from 'src/app/models/auth/InfoUserAuthDto';
import { ProfileComponent } from 'src/app/pages/admin/accounts/profile/update-profile.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  providers: [DialogService, MessageService],
})
export class UserPanelComponent implements OnInit {
  dataInfo: InfoUserAuthDto;
  user: InfoUserAuthDto;
  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.user = authService.InfoUserAuthDto;
  }

  ngOnInit() {
    this.dataInfo = this.authService.InfoUserAuthDto;
  }
  ShowModal() {
    this.ref = this.dialogService.open(ProfileComponent, {
      header: 'Actualizar datos de Usuario',

      baseZIndex: 10000,
      closeOnEscape: true,
      styleClass: 'anchoModal',
    });
    this.ref.onClose.subscribe((resp: any) => {
      console.log('modal cerrado..');
      if (resp == 'ok') {
        this.messageService.add({
          severity: 'success',
          summary: 'Completado!!',
          detail: 'datos actualizados',
        });
      }
      if (resp == 'okPassword') {
        this.messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: 'Contraseña actualizada',
        });
      }
      if (resp == 'img') {
        this.messageService.add({
          severity: 'success',
          summary: 'Completado',
          detail: 'Foto actualizada',
        });
      }
    });
  }
}
