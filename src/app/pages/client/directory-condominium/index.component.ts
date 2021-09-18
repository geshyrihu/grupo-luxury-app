import { AddoreditDirectoryCondominiumComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DirectoryCondominiumDto } from './interfaces/DirectoryCondominiumDto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexDirectoryCondominiumComponent implements OnInit {
  data: DirectoryCondominiumDto[] = [];
  ref: DynamicDialogRef;
  customerId$: Observable<number>;

  //Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private customerSelectService: CustomerSelectService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');

    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
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
      .get<DirectoryCondominiumDto[]>(
        `DirectoryCondominium/GetAllAsync/${this.customerSelectService.customerId}`
      )
      .subscribe(
        (resp) => {
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
    this.dataService.delete(`DirectoryCondominium/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al itentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }
  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditDirectoryCondominiumComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModalDirectory',
      closeOnEscape: true,
      autoZIndex: true,
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
