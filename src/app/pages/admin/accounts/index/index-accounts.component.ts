import { Component } from '@angular/core';
import { CardUserComponent } from 'src/app/pages/auth/card-user/card-user.component';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { IndexAccountDto } from '../../../../interfaces/accounts/IndexAccountDto';
import { MessageService } from 'primeng/api';
import { RoleComponent } from '../role/update-role.component';
import { SelectItemDto } from 'src/app/interfaces/SelectItemDto';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';
import { ECloseModal } from 'src/app/shared/enums/ECloseModal';

const base_urlImg = environment.base_urlImg + 'Administration/accounts/';

@Component({
  selector: 'app-indexaccounts',
  templateUrl: './index-accounts.component.html',
  providers: [DialogService, MessageService],
})
export class IndexComponent {
  data: IndexAccountDto[] = [];

  idUser: string;
  cb_Customer: SelectItemDto[] = [];
  cb_Profession: SelectItemDto[] = [];
  queryTemp: string;
  ref: DynamicDialogRef;
  state: boolean = true;
  title: string = '';
  url = base_urlImg;
  stateOptions: any[];

  constructor(
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private selectlistService: SelectlistService
  ) {
    this.loadComboBox();
    this.onLoadData();
    this.stateOptions = [
      { icon: 'fas fa-unlock-alt', value: true },
      { icon: 'fas fa-lock', value: false },
    ];
  }

  loadComboBox(): void {
    this.selectlistService.getCustomersActive().subscribe((resp) => {
      this.cb_Customer = resp;
    });
    this.selectlistService.getProfessions().subscribe((resp) => {
      this.cb_Profession = resp;
    });
  }

  onLoadData(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get<IndexAccountDto[]>(`Accounts/GetAll/${this.state}`)
      .subscribe(
        (resp) => {
          this.data = resp.body;
          if (this.state) {
            this.title = 'Activas';
          } else {
            this.title = 'Inactivas';
          }
          Swal.close();
        },
        (err) => {
          this.showSuccess('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }

  // Bloqueo de Usuario
  toBlock(id: string): void {
    this.dataService.get('Accounts/ToBlockAccount/' + id).subscribe(
      (resp) => {
        this.onLoadData();
        this.showSuccess('error', 'Completado!!', 'Usuario bloqueado!!');
      },
      (err) => {
        this.showSuccess('error', 'Error', err);
      }
    );
  }

  // Desbloquear Usuario
  toUnlock(id: string): void {
    this.dataService.get('Accounts/ToUnlockAccount/' + id).subscribe(
      (resp) => {
        this.onLoadData();
        this.showSuccess('success', 'Completado!!', 'Usuario desbloqueado!!');
      },
      (err) => {
        this.showSuccess('error', 'Error', err);
      }
    );
  }
  delete(id: string): void {
    this.dataService.delete('Accounts/' + id).subscribe(
      (resp) => {
        this.onLoadData();
      },
      (err) => {
        this.showSuccess(
          'error',
          'Error',
          'Ya no se puede eliminar esta cuenta'
        );
        console.log(err.error);
      }
    );
  }

  modalRole(id: string): void {
    this.ref = this.dialogService.open(RoleComponent, {
      data: {
        id: id,
      },
      header: 'Editar permisos',
      width: '360px',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: ECloseModal) => {
      if (resp === ECloseModal.Success) {
        this.showSuccess('success', 'Completado!!', 'Permisos actualizados!!');
      }
      if (resp === ECloseModal.Error) {
        this.showSuccess('error', 'Error', 'Ha ocurrido un error!!');
      }
    });
  }

  updateProfession(id: string, item: number) {
    return this.dataService
      .put(`Accounts/UpdateProfessionAccount/${id}/${item}`, null)
      .subscribe(
        (resp) => {
          this.showSuccess('success', 'Completado!!', 'Profesión actualizada');
        },
        (err) => {
          console.log(err.error);
          this.showSuccess('error', 'Error', 'Ha ocurrido un error!!');
        }
      );
  }
  updateCustomer(id: string, item: number) {
    return this.dataService
      .put(`Accounts/UpdateCustomerAccount/${id}/${item}`, null)
      .subscribe(
        (resp) => {
          this.showSuccess('success', 'Completado!!', 'Cliente actualizado');
        },
        (err) => {
          console.log(err.error);
          this.showSuccess('error', 'Error', 'Ha ocurrido un error!!');
        }
      );
  }

  onUserCard(userId: string) {
    this.ref = this.dialogService.open(CardUserComponent, {
      data: {
        userId: userId,
      },
      header: 'Tarjeta de Usuario',
      styleClass: 'sizeCardUser',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: ECloseModal) => {});
  }

  showSuccess(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
