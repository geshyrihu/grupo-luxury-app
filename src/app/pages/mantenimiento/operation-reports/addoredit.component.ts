import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from 'src/app/shared/services/date.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { EPriority } from 'src/app/shared/enums/EPriority';
import { EStatus } from 'src/app/shared/enums/EStatus';
import { environment } from 'src/environments/environment';
import { PanelDto } from '../../../models/operationReport/panelDto';
import Swal from 'sweetalert2';
import { formDateToString } from 'src/app/shared/helpers/utilities';
import { SignalrcustomService } from 'src/app/shared/services/signalrcustom.service';
const date = new Date();
@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditOperationReportComponent implements OnInit {
  id: any = 0;
  customerId: any;
  panelDto = new PanelDto();
  cb_status = EStatus.GetEnum();
  cb_priority = EPriority.GetEnum();
  cb_responsibleArea: any[] = [];
  form: FormGroup;
  photoAfterFileUpdate: boolean = false;
  photoBeforeFileUpdate: boolean = false;
  urlBaseImg = '';
  model: any;

  isInRoleMantenimiento = false;
  SuperUsuario = false;
  Colaborador: boolean = true;

  cb_userCustomers: any[] = [];

  // Enviando...

  enviando: boolean = false;
  labelButton: string = 'Guardar';
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dateService: DateService,
    private signalrcustomService: SignalrcustomService
  ) {
    this.isInRoleMantenimiento = this.authService.isMantenimiento;
    this.SuperUsuario = this.authService.isSuperUsuario;
    this.Colaborador = this.authService.isColaborador;
    console.log('Colaborador: ', this.Colaborador);
  }
  ngOnInit(): void {
    this.customerId = this.config.data.customerAuthId;
    this.urlBaseImg = `${environment.base_urlImg}customers/${this.customerId}/report/`;
    this.loadComboBox();
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData(this.id);
    }
    this.loadForm(this.config.data.status);
  }

  loadComboBox() {
    this.selectListService.getResponsibleArea().subscribe((resp) => {
      this.cb_responsibleArea = resp;
    });

    this.selectListService
      .GetUserCustomer(this.customerId)
      .subscribe((resp) => {
        this.cb_userCustomers = resp;
      });
  }

  loadForm(status: number) {
    let dateFinal: any;
    if (this.config.data.status === 1) {
      dateFinal = this.dateService.getDateNow();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      activity: ['', Validators.required],
      dateFinished: [null],
      dateRequest: [this.dateService.getDateNow(), Validators.required],
      observations: [''],
      photoPathAfter: [''],
      photoPathBefore: [''],
      priority: [0, Validators.required],
      responsibleAreaId: ['', Validators.required],
      status: [status, Validators.required],
      customerId: [this.customerId],

      fechaProgamacion: [''],
      fechaLimite: [''],
      responsable: [''],
      folioReporte: [true],
    });
  }

  onLoadData(id: number) {
    this.dataService.get(`OperationReports/${id}`).subscribe(
      (resp: any) => {
        this.model = resp.body;

        this.form.patchValue(resp.body);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  onSubmit() {
    this.enviando = true;
    this.labelButton = 'Enviando...';

    console.log(this.form.value);

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      const model = this.createFormData(this.form.value);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Enviando información...',
      });
      Swal.showLoading();

      if (this.id === 0) {
        this.dataService.post(`OperationReports/Create`, model).subscribe(
          (resp) => {
            this.enviando = false;
            this.labelButton = 'Guardar';
            this.ref.close('Reporte agregado');
          },
          (err) => {
            this.enviando = false;
            this.labelButton = 'Guardar';
            console.log(err.error);
          }
        );
      } else {
        this.dataService.put(`OperationReports/${this.id}`, model).subscribe(
          (resp) => {
            this.enviando = false;
            this.labelButton = 'Guardar';
            this.ref.close('Reporte actualizado');
          },
          (err) => {
            this.enviando = false;
            this.labelButton = 'Guardar';
            console.log(err.error);
          }
        );
      }
    }
    Swal.close();
  }

  // ...Creación de FormData
  createFormData(dto: any) {
    const formData = new FormData();
    // if (dto.status === 1) {
    //   // dto.dateFinished = new Date().toUTCString();
    //   // dto.dateFinished = new Date().toString();
    // }
    // if (dto.status !== 1) {
    //   dto.dateFinished = null;
    // }

    formData.append('dateRequest', String(dto.dateRequest));
    formData.append('activity', dto.activity);
    formData.append('observations', dto.observations);
    formData.append('status', String(dto.status));
    formData.append('priority', String(dto.priority));
    formData.append('customerId', String(dto.customerId));
    formData.append('responsibleAreaId', String(dto.responsibleAreaId));
    if (dto.fechaProgamacion !== null)
      formData.append('fechaProgamacion', String(dto.fechaProgamacion));
    if (dto.fechaLimite !== null)
      formData.append('fechaLimite', String(dto.fechaLimite));
    if (dto.dateFinished !== null)
      formData.append('dateFinished', String(dto.dateFinished));

    formData.append('responsable', dto.responsable);
    formData.append('folioReporte', dto.folioReporte);

    if (dto.photoPathAfter)
      formData.append('photoPathAfter', dto.photoPathAfter);

    if (dto.photoPathBefore)
      formData.append('photoPathBefore', dto.photoPathBefore);
    formData.append('user', this.authService.InfoUserAuthDto.id);

    return formData;
  }
  get activity() {
    return this.form.get('activity');
  }
  get dateRequest() {
    return this.form.get('dateRequest');
  }
  get photoPathBeforeForm() {
    return this.form.get('photoPathBefore');
  }

  get responsibleAreaId() {
    return this.form.get('responsibleAreaId');
  }
  get responsable() {
    return this.form.get('responsable');
  }

  uploadFileAfter(file: File) {
    this.photoAfterFileUpdate = true;
    this.form.patchValue({ photoPathAfter: file });
  }
  uploadFileBefore(file: File) {
    this.photoBeforeFileUpdate = true;
    this.form.patchValue({ photoPathBefore: file });
  }
}
