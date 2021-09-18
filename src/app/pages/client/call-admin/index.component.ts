import { AddoreditCallAdminComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReportService } from '../../../shared/services/report.service';
import { Router } from '@angular/router';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';
import { CallAdminDto } from './interface/CallAdminDto';
import { FilterCallAdminDto } from './interface/CallAdmin';

@Component({
  selector: 'app-call-admin',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexCallAdminComponent implements OnInit {
  //...Variables PDF
  date = this.dateService.getDateNow();

  //...Variables PDF
  customerList: any[] = [];
  data: CallAdminDto[] = [];
  filterCallAdmin: FilterCallAdminDto = new FilterCallAdminDto();

  ref: DynamicDialogRef;
  dateAfter = this.dateServide.getDateNow30();
  form: FormGroup;
  customerId$: Observable<number>;

  // Permisos
  Asistente: boolean = false;
  Residente: boolean = false;
  SuperUsuario: boolean = false;
  Mantenimiento: boolean = false;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private dateService: DateService,
    private selectList: SelectlistService,
    private dateServide: DateService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private reportService: ReportService,
    private router: Router,
    private customerSelectService: CustomerSelectService
  ) {
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.Asistente = authService.validationRole('Asistente');

    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }
  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .post(
        `CallsAdmin/${this.customerSelectService.customerId}`,
        this.filterCallAdmin
      )
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
    this.dataService.delete('CallsAdmin/' + data.id).subscribe(
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
    this.ref = this.dialogService.open(AddoreditCallAdminComponent, {
      data: {
        id: data.id,
      },
      header: data.title,
      styleClass: 'anchoModalInventory',
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

  onSubmit(filter: any): void {
    this.filterCallAdmin = filter;
    this.onLoadData();
  }

  generetePDF() {
    this.reportService.setReportCallAdmin(this.data);
    this.router.navigateByUrl('report/callAdmin');
  }
}
