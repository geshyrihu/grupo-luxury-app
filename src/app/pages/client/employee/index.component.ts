import { ContactEmployeeComponent } from './contact-employee.component';
import { AddoreditEmplopyeeComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { EmployeeDto } from './interfaces/EmployeeDto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexEmployeeComponent implements OnInit {
  data: EmployeeDto[] = [];
  url_img = '';
  isInRole: boolean;
  ref: DynamicDialogRef;
  customerId$: Observable<number>;

  // Permisos
  Asistente: boolean = true;
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private customerSelectService: CustomerSelectService
  ) {
    this.Asistente = authService.validationRole('Asistente');
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');

    this.cuentasActivas();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.cuentasActivas();
    });
  }

  cuentasActivas() {
    this.url_img = `${environment.base_urlImg}customers/${this.customerSelectService.customerId}/employee/`;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get<EmployeeDto[]>(
        `Employees/GetAllActive/${this.customerSelectService.customerId}`
      )
      .subscribe(
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
  cuentasInactivas() {
    this.url_img = `${environment.base_urlImg}customers/${this.customerSelectService.customerId}/employee/`;

    this.data = [];
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(`Employees/GetAllInactive/${this.customerSelectService.customerId}`)
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

  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`Employees/${data.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.cuentasActivas();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al itentar borrar');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditEmplopyeeComponent, {
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
        this.cuentasActivas();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  showModalcontactEmployee(employee: EmployeeDto, header: string) {
    this.ref = this.dialogService.open(ContactEmployeeComponent, {
      data: {
        id: employee.id,
      },
      header: header + employee.name + ' ' + employee.lastName,
      styleClass: 'modalTipeA',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.cuentasActivas();
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
