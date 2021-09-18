import { AddoreditBudgetCardComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';

const date = new Date();

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService],
})
export class IndexBudgetCardComponent implements OnInit {
  cb_customer: any[] = [];
  userId: string = '';
  ref: DynamicDialogRef;
  data: any[] = [];
  year: number = date.getFullYear();
  cb_Year: any[] = [];
  autorizado: boolean = false;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private selectListService: SelectlistService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.userId = this.authService.InfoUserAuthDto.id;

    this.autorizado = authService.validationRole('SuperUsuario');
    selectListService.getCustomersActive().subscribe((resp: any) => {
      this.cb_customer = resp;
    });
    this.dataService.get(`ComboBox/GetAllYears`).subscribe(
      (resp: any) => {
        this.cb_Year = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  ngOnInit(): void {
    this.onLoadData();
  }
  onChangeYear() {
    this.onLoadData();
  }
  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get(`CedulaPresupuestal/GetAllAsync/`).subscribe(
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

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditBudgetCardComponent, {
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

  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CedulaPresupuestal/${data.id}`).subscribe(
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
}
