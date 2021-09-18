import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { CatalogInstallationAddOrEditComponent } from './catalog-installation-add-or-edit/catalog-installation-add-or-edit.component';
import { AddCheckListComponent } from './add-check-list/add-check-list.component';
@Component({
  selector: 'app-catalog-installation',
  templateUrl: './catalog-installation.component.html',
  providers: [DialogService, MessageService],
})
export class CatalogInstallationComponent implements OnInit {
  data: any[] = [];
  isInRole: boolean;
  ref: DynamicDialogRef;
  isInRoleSuperUsuario = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.isInRoleSuperUsuario = this.authService.isSuperUsuario;
  }

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
    this.dataService.get('CatalogInstallation').subscribe(
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
    this.dataService.delete(`CatalogInstallation/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        this.onLoadData();
        Swal.close();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }

  onModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(CatalogInstallationAddOrEditComponent, {
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
  onAddCheckList(installationId: number) {
    this.ref = this.dialogService.open(AddCheckListComponent, {
      data: {
        installationId: installationId,
      },
      header: 'Agregar',
      styleClass: 'anchoModal',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData();
      this.showToast('success', 'Completado!!', resp);
    });
  }

  onDeleteCheckList(installationId: number, checkListId: number) {
    const data = {
      catalogCheckListId: checkListId,
      catalogInstallationId: installationId,
    };

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });

    Swal.showLoading();
    this.dataService
      .delete(
        `CatalogInstallation/DeleiteCheckList/${checkListId}/${installationId}`
      )
      .subscribe(
        (resp) => {
          this.showToast('info', 'Info', `Registro Borrado!`);
          this.onLoadData();
          Swal.close();
        },
        (err) => {
          this.showToast('error', 'Error!!', 'Error al borrar');
          Swal.close();
          console.log(err.error);
        }
      );
    Swal.close();
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
