import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';
import { AddoreditChartOfAccountComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService],
})
export class IndexChartOfAccountComponent implements OnInit {
  data: any[] = [];
  ref: DynamicDialogRef;

  autorizado = false;

  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public authService: AuthService
  ) {
    this.autorizado = authService.validationRole('SuperUsuario');
  }
  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get('Cuentas/').subscribe(
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
    this.dataService.delete(`Cuentas/${data.id}`).subscribe(
      (resp) => {
        this.showToast('success', 'Completado!!', `Registro Elíminado`);
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
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditChartOfAccountComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      height: 'auto',
      styleClass: 'anchoModal',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: string) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.messageService.add({
          severity: 'success',
          summary: 'Completado!!',
          detail: resp,
        });
      }
    });
  }
}
