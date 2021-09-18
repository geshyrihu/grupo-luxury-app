import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AddoreditProviderComponent } from './addoredit.component';
import { CardProviderComponent } from './card-provider/card-provider.component';
import { ProviderUseComponent } from './provider-use/provider-use.component';
import { ProviderAddOrEditCategoryComponent } from './provider-add-or-edit-category/provider-add-or-edit-category.component';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';
import { QualificationProviderComponent } from './qualification-provider/qualification-provider.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexProviderComponent implements OnInit {
  stateProvider: boolean = true;
  customerList: any[] = [];
  isInRole: boolean;
  url_img = `${environment.base_urlImg}providers/`;
  data: any[] = [];
  ref: DynamicDialogRef;
  rowGroupMetadata: any;

  idUser: string = '';

  cb_categorias: any[] = [];
  categoriaId: number = 0;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  SupervisionOperativa: boolean = true;

  constructor(
    private selectListService: SelectlistService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private authService: AuthService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.SupervisionOperativa = authService.validationRole(
      'SupervisionOperativa'
    );

    this.selectListService.getCategories().subscribe((resp) => {
      this.cb_categorias = resp;
    });

    this.idUser = this.authService.InfoUserAuthDto.id;
  }

  ngOnInit(): void {
    this.isInRole = this.authService.validationRole('SuperUsuario');
    this.onLoadData(true);
  }

  onLoadData(stateProvider: boolean) {
    this.stateProvider = stateProvider;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(`Providers/GetAsyncAll/${this.stateProvider}`)
      .subscribe(
        (resp: any) => {
          const proveedores: any[] = resp.body;

          proveedores.forEach((item) => {
            if (
              item.customerId !== 1 &&
              item.customerId !== this.authService.customerAuthId
            ) {
              proveedores.splice(item, 1);
            }
          });

          this.data = proveedores;
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
    this.dataService.delete(`Providers/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData(this.stateProvider);
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  showModalCardProveedor(data: any) {
    this.ref = this.dialogService.open(CardProviderComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModalOperationReport',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
  }
  showModalCalificarProveedor(data: any) {
    this.ref = this.dialogService.open(QualificationProviderComponent, {
      data: {
        providerId: data.providerId,
        userId: this.authService.InfoUserAuthDto.id,
      },
      header: 'Calificar a ' + data.nameProvider,
      styleClass: 'calificarProveedorModal',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData(this.stateProvider);
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditProviderComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModalOperationReport',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData(this.stateProvider);
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  coincidencias(providerId: number) {
    this.ref = this.dialogService.open(ProviderUseComponent, {
      data: {
        providerId: providerId,
      },
      header: 'Coincidencias',
      styleClass: 'anchoModalOperationReport',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData(this.stateProvider);
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  AddCategory(providerId: number) {
    this.ref = this.dialogService.open(ProviderAddOrEditCategoryComponent, {
      data: {
        providerId: providerId,
      },
      width: '30%',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData(this.stateProvider);
      this.showToast('success', 'Completado!!', resp);
    });
  }
  onActivateProvider(data: any) {
    this.dataService
      .put(`Providers/ChangeState/${data.providerId}/${data.state}`, null)
      .subscribe(
        (resp) => {
          this.onLoadData(this.stateProvider);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  buscarPorCategoria() {
    if (this.categoriaId === 0) {
      this.onLoadData(this.stateProvider);
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Cargando información...',
      });
      Swal.showLoading();
      this.dataService
        .get(`Providers/BuscarPorCategoria/` + this.categoriaId)
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
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
