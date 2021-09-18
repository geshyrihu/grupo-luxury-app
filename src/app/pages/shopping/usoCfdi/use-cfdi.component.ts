import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';
import { AddoreditUseCFDIComponent } from './addoredit.component';
import { UseCFDIDto } from './interfaces/UseCfdi';

@Component({
  selector: 'app-use-cfdi',
  templateUrl: './use-cfdi.component.html',
  providers: [DialogService, MessageService],
})
export class UseCfdiComponent implements OnInit {
  data: UseCFDIDto[] = [];
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
    this.dataService.get<UseCFDIDto[]>('UsoCFDIs').subscribe(
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

  onDelete(dto: UseCFDIDto) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`UsoCFDIs/${dto.id}`).subscribe(
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

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditUseCFDIComponent, {
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
