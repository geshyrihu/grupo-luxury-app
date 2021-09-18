import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormRequestComponent } from '../form-request/form-request.component';
import { MessageService } from 'primeng/api';
import { requestDto } from 'src/app/pages/comunes/requests/interfaces/request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './index-request.component.html',
  providers: [DialogService, MessageService],
})
export class IndexRequestsComponent {
  data: Request[] = [];
  isInRole: boolean;
  ref: DynamicDialogRef;
  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get<Request>('Requests').subscribe(
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

  onDelete(data: requestDto) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete('Requests/' + data.id).subscribe(
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

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(FormRequestComponent, {
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
