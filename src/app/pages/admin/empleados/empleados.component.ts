import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { EmpleadosEditComponent } from '../empleados-edit/empleados-edit.component';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  providers: [DialogService, MessageService],
})
export class EmpleadosComponent implements OnInit {
  data: any[] = [];
  pahtBaseImg = environment.base_urlImg + 'customers/';
  isInRole: boolean;
  terminoBusqueda: boolean = true;
  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isInRole = this.authService.validationRole('SuperUsuario');
    this.onLoadData(true);
  }

  onLoadData(state: boolean) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get<any[]>('Employees/GetAllEmpleados/' + state).subscribe(
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

  onModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(EmpleadosEditComponent, {
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
        this.onLoadData(this.terminoBusqueda);
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
