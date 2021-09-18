import { AddoreditOperationReportComponent } from './addoredit.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { FilterReportOperationService } from 'src/app/shared/services/filter-report-operation.service';
import { Observable } from 'rxjs';
import { PanelComponent } from './panel.component';
import { PanelDto } from './../../../models/operationReport/panelDto';
import { ReportService } from 'src/app/shared/services/report.service';
import { Router } from '@angular/router';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import Swal from 'sweetalert2';
import { CardUserComponent } from '../../auth/card-user/card-user.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class IndexOperationReportComponent implements OnInit {
  ref: DynamicDialogRef;
  base_urlImg = '';
  data: any[] = [];
  panelDto = new PanelDto();
  listCustomer: any[] = [];
  isInRole: boolean;
  url = `${environment.base_urlImg}Administration/accounts/`;
  customerId$: Observable<number>;

  // Permisos
  Residente: boolean = true;
  SuperUsuario: boolean = true;
  Mantenimiento: boolean = true;
  Colaborador: boolean = true;
  SupervisionOperativa: boolean = true;

  date = new Date();

  constructor(
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    private authService: AuthService,
    private selectListServiece: SelectlistService,
    private router: Router,
    private reportService: ReportService,
    private panelReportService: FilterReportOperationService,
    private customerSelectService: CustomerSelectService
  ) {
    this.Residente = authService.validationRole('Residente');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.Colaborador = authService.validationRole('Colaborador');
    this.SupervisionOperativa = authService.validationRole(
      'SupervisionOperativa'
    );

    this.setPanelDto();
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.panelReportService.setIdCustomer(
        this.customerSelectService.customerId
      );
      this.onLoadData();
    });
  }
  setPanelDto() {
    return this.panelReportService.getPanelDto();
  }

  onLoadData() {
    this.base_urlImg = `${
      environment.base_urlImg
    }customers/${this.panelReportService.getIdCustomer()}/report/`;
    this.data = [];
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .post<PanelDto>('OperationReports', this.panelReportService.getPanelDto())
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
  showModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(AddoreditOperationReportComponent, {
      data: {
        panelDto: this.panelDto,
        id: data.id,
        status: data.status,
        customerAuthId: this.customerSelectService.customerId,
      },
      header: data.title,
      styleClass: 'anchoModalOperationReport',
      autoZIndex: true,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }
  showModalPanel() {
    this.ref = this.dialogService.open(PanelComponent, {
      data: {
        panelDto: this.panelDto,
      },
      header: 'Buscar reportes',
      styleClass: 'anchoModalInventory',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.panelDto = resp;
        this.onLoadData();
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
  onDelete(item: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService
      .delete(`OperationReports/onDelete/${item.id}/${this.authService.UserId}`)
      .subscribe(
        (resp) => {
          console.log('Id item borrado: ', item.id);
          this.showToast('info', 'Info', `${item.id} Borrado!`);
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
  onGeneratePDF() {
    this.reportService.setCustomerId(this.customerSelectService.customerId);
    this.reportService.setDataOperationReport(this.panelDto);
    this.router.navigateByUrl('report/operationReport');
  }
  onGeneratePendientesPDF() {
    this.reportService.setCustomerId(this.customerSelectService.customerId);
    this.reportService.setDataOperationReport(this.panelDto);
    this.router.navigateByUrl('report/operationPendientesReport');
  }
  rowGroupMetadata: any;
  onSort() {
    this.updateRowGroupMetaData();
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        let rowData = this.data[i];
        let representativeName = rowData.responsibleArea;

        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.data[i - 1];
          let previousRowGroup = previousRowData.responsibleArea;
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
  }
  onUserCard(userId: string) {
    this.ref = this.dialogService.open(CardUserComponent, {
      data: {
        userId: userId,
      },
      header: 'Tarjeta de Usuario',
      styleClass: 'sizeCardUser',
      closeOnEscape: true,
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((resp: any) => {});
  }
  onMandarReporte(item) {
    this.dataService
      .get(
        `OperationReports/ActualizarStateEnviarReporte/${item.id}/${item.folioReporte}`
      )
      .subscribe(
        (resp) => {},
        (err) => {
          console.log(err.error);
        }
      );
  }

  // Validar permiso para editar
  PermissionToEdit;
  onValidateOptionEdit(responsableId: string): boolean {
    if (
      this.Residente ||
      this.SuperUsuario ||
      this.Mantenimiento ||
      this.SupervisionOperativa ||
      this.authService.UserId === responsableId
    ) {
      return true;
    } else {
      return false;
    }
  }
}
