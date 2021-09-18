// import {
//   WeeklyReport,
//   WeeklyReportAddOrEdit,
// } from '../../../interfaces/WeeklyReport';
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
import Swal from 'sweetalert2';
import { formDateToString } from 'src/app/shared/helpers/utilities';
@Component({
  selector: 'app-addoredit-sistemas-reporte',
  templateUrl: './addoredit-sistemas-reporte.component.html',
})
export class AddoreditSistemasReporteComponent implements OnInit {
  id: any = 0;
  _customerId: number = 0;
  cb_status = EStatus.GetEnum();
  cb_priority = EPriority.GetEnum();
  cb_responsibleArea: any[] = [];
  cb_request: any[] = [];
  cb_customer: any[] = [];
  form: FormGroup;
  photoAfterFileUpdate: boolean = false;
  photoBeforeFileUpdate: boolean = false;
  urlBaseImg = '';
  model: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dateService: DateService
  ) {}
  ngOnInit(): void {
    this.loadComboBox();
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.loadData(this.id);
    }
    this.loadForm(this.config.data.status);
  }

  loadComboBox() {
    this.selectListService.getResponsibleArea().subscribe((resp) => {
      this.cb_responsibleArea = resp;
    });
    this.selectListService.getRequest().subscribe((resp) => {
      this.cb_request = resp;
    });
    this.selectListService.getCustomersActive().subscribe((resp) => {
      this.cb_customer = resp;
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
      responsibleAreaId: [13],
      status: [status, Validators.required],
      customerId: ['', Validators.required],
    });
  }

  loadData(id: number) {
    this.dataService.get(`OperationReports/${id}`).subscribe((resp: any) => {
      this.model = resp.body;

      this.form.patchValue(resp.body);
      this.urlBaseImg = `${environment.base_urlImg}customers/${this.model.customerId}/report/`;
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      console.log('Formulario invalido');
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
            this.ref.close('Reporte creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
      } else {
        this.dataService.put(`OperationReports/${this.id}`, model).subscribe(
          (resp) => {
            this.ref.close('Reporte actualizado');
          },
          (err) => {
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

    if (dto.status === 1) {
      dto.dateFinished = new Date().toUTCString();
    }
    if (dto.status !== 1) {
      dto.dateFinished = null;
    }

    formData.append('dateRequest', formDateToString(dto.dateRequest));
    formData.append('activity', dto.activity);
    formData.append('observations', dto.observations);
    formData.append('status', String(dto.status));
    formData.append('priority', String(dto.priority));
    formData.append('customerId', String(dto.customerId));
    formData.append('responsibleAreaId', String(dto.responsibleAreaId));
    if (dto.dateFinished !== null)
      formData.append('dateFinished', String(dto.dateFinished));
    if (dto.photoPathAfter) {
      formData.append('photoPathAfter', dto.photoPathAfter);
    }
    if (dto.photoPathBefore) {
      formData.append('photoPathBefore', dto.photoPathBefore);
    }
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
  get customerId() {
    return this.form.get('customerId');
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
