import { CrudProductosComponent } from './crud-productos.component';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  providers: [DialogService, MessageService],
})
export class IndexProductosComponent implements OnInit {
  urlBaseImg = `${environment.base_urlImg}Administration/products/`;
  urlBaseImgUser = `${environment.base_urlImg}Administration/accounts/`;
  data: any[] = [];
  isInRole: boolean;
  ref: DynamicDialogRef;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  SupervisionOperativa: boolean = true;

  idUser: string = '';
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.SupervisionOperativa = authService.validationRole(
      'SupervisionOperativa'
    );
    this.idUser = this.authService.InfoUserAuthDto.id;
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
    this.dataService.get(`Productos`).subscribe(
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

  // ... Eliminar registro
  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`Productos/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  // ... Llamada al Modal agregar o editar
  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(CrudProductosComponent, {
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
