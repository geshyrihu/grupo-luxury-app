import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';
import { FormCustomerComponent } from '../form-customer/form-customers.component';
import { customerDto } from '../interfaces/customer';

@Component({
  selector: 'app-index-customers',
  templateUrl: './index-customers.component.html',
  providers: [DialogService, MessageService],
})
export class IndexCustomerComponent implements OnInit {
  urlBaseImg = `${environment.base_urlImg}Administration/customer/`;
  data: customerDto[] = [];
  superUsuario: boolean;
  ref: DynamicDialogRef;
  title = 'Activos';
  state = true;
  mostrar = true;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.superUsuario = this.authService.validationRole('SuperUsuario');
    this.onLoadData();
  }

  // ... Carga de datos recibidos del Api
  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get(`Customers/GetAllAsync/${this.state}`).subscribe(
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
    this.dataService.delete('Customers/' + data.id).subscribe(
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

  // ... Llamada al Modal agregar o editar
  onModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(FormCustomerComponent, {
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
  // ... Seleccion de status de cliente , activo o inactivo
  onSortChange(valor: any) {
    this.state = valor;
    this.state === true ? (this.title = 'Activos') : (this.title = 'Inctivos');
    this.onLoadData();
  }
}
