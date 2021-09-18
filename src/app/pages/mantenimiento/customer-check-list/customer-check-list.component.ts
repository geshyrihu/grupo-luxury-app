import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { CustomerCheckListAddOrEditComponent } from './customer-check-list-add-or-edit/customer-check-list-add-or-edit.component';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
@Component({
  selector: 'app-customer-check-list',
  templateUrl: './customer-check-list.component.html',
  providers: [DialogService, MessageService],
})
export class CustomerCheckListComponent implements OnInit {
  data: any[] = [];
  superUsuario: boolean;
  ref: DynamicDialogRef;
  customerId$: Observable<number>;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private customerSelectService: CustomerSelectService
  ) {
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.superUsuario = this.authService.validationRole('SuperUsuario');

    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(`CustomerCheckList/GetAll/${this.customerSelectService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al cargar la información');
          console.log(err.error);
          Swal.close();
        }
      );
  }
  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CustomerCheckList/${data.id}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }

  agregarInstalacion(data: any) {
    this.ref = this.dialogService.open(CustomerCheckListAddOrEditComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
