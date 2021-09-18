import { AuthService } from 'src/app/shared/services/auth.service';
import { categoryDto } from '../interfaces/category';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { FormCategorieComponent } from '../form-categorie/form-categorie.component';

@Component({
  selector: 'app-index-categorie',
  templateUrl: './index-categorie.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexCategorieComponent implements OnInit {
  data: categoryDto[] = [];
  isInRole: boolean;
  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.isInRole = this.authService.validationRole('SuperUsuario');
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get('Categories').subscribe(
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

  onDelete(data: categoryDto) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`Categories/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
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

  onModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(FormCategorieComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: string) => {
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
