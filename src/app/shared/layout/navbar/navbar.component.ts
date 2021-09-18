import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InfoUserAuthDto } from 'src/app/models/auth/InfoUserAuthDto';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfileComponent } from 'src/app/pages/admin/accounts/profile/update-profile.component';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { SelectlistService } from '../../services/selectlist.service';
import { SignalrcustomService } from '../../services/signalrcustom.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [DialogService, MessageService],
})
export class NavbarComponent implements OnInit {
  urlImg = environment.base_urlImg + 'Administration/customer/';

  dataInfo: InfoUserAuthDto;
  urlImgUser = '';
  menu: any[] = [];
  user: InfoUserAuthDto;
  ref: DynamicDialogRef;

  customerId: number = 0;

  nameCustomer: string = '';
  cb_Customer: any[] = [];
  SupervisionOperativa: boolean = false;
  Contador: boolean = true;
  SuperUsuario: boolean = true;

  constructor(
    private authService: AuthService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService,
    private selectListService: SelectlistService,
    private signalrcustomService: SignalrcustomService
  ) {
    this.user = authService.InfoUserAuthDto;
    this.nameCustomer = this.authService.InfoUserAuthDto.customer;
    this.customerId = this.authService.customerAuthId;
    selectListService.getCustomersActive().subscribe((resp) => {
      this.cb_Customer = resp;
    });
    this.SupervisionOperativa = authService.validationRole(
      'SupervisionOperativa'
    );
    this.Contador = authService.validationRole('Contador');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
  }

  ngOnInit() {
    this.dataInfo = this.authService.InfoUserAuthDto;
  }

  showModal() {
    this.ref = this.dialogService.open(ProfileComponent, {
      header: 'Actualizar datos de Usuario',

      baseZIndex: 10000,
      closeOnEscape: true,
      styleClass: 'anchoModal',
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'Completado!!',
          detail: resp,
        });
      }
    });
  }

  selectCustomer(customerId: number) {
    this.customerSelectService.setCustomerId(customerId);
  }
}
