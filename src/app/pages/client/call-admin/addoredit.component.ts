import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ERequest } from 'src/app/shared/enums/ERequest';
import { EStatus } from 'src/app/shared/enums/EStatus';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditCallAdminComponent implements OnInit {
  id: any = 0;
  customerId: any;
  cb_DirectoryCondominium: any[] = [];
  cb_ResponsibleArea: any[] = [];
  cb_Employee: any[] = [];
  cb_Request = ERequest.GetEnum();
  cb_Status = EStatus.GetEnum();

  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    dateRequest: [this.dateService.getDateNow(), Validators.required],
    timeRequest: [this.dateService.getHoraNow(new Date()), Validators.required],
    directoryCondominiumId: ['', Validators.required],
    requestService: ['', Validators.required],
    request: ['', Validators.required],
    responsibleAreaId: ['', Validators.required],
    employeeId: ['', Validators.required],
    status: ['', Validators.required],
    observations: [''],
    customerId: [this.authService.customerAuthId],
  });
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dateService: DateService
  ) {
    this.selectListService.getDirectoryCondominium().subscribe((resp) => {
      this.cb_DirectoryCondominium = resp;
    });
    this.selectListService.getResponsibleArea().subscribe((resp) => {
      this.cb_ResponsibleArea = resp;
    });
    this.selectListService.getEmployee().subscribe((resp) => {
      this.cb_Employee = resp;
    });
  }

  ngOnInit(): void {
    this.customerId = this.authService.customerAuthId;
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  onLoadData() {
    this.dataService.get(`CallsAdmin/${this.id}`).subscribe((resp: any) => {
      resp.body.dateRequest = this.dateService.getDateFormat(
        resp.body.dateRequest
      );
      resp.body.timeRequest = this.dateService.getDateString(
        resp.body.timeRequest
      );
      this.form.patchValue(resp.body);
    });
  }
  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService.post(`CallsAdmin/`, this.form.value).subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error.errors);
          }
        );
      } else {
        this.dataService
          .put(`CallsAdmin/${this.id}`, this.form.value)
          .subscribe(
            (resp) => {
              this.ref.close('Registro actualizado');
            },
            (err) => {
              console.log(err.error.errors);
            }
          );
      }
    }
  }
  get dateRequest() {
    return this.form.get('dateRequest');
  }
  get timeRequest() {
    return this.form.get('timeRequest');
  }
  get directoryCondominiumId() {
    return this.form.get('directoryCondominiumId');
  }
  get requestService() {
    return this.form.get('requestService');
  }
  get request() {
    return this.form.get('request');
  }
  get responsibleAreaId() {
    return this.form.get('responsibleAreaId');
  }
  get employeeId() {
    return this.form.get('employeeId');
  }
  get status() {
    return this.form.get('status');
  }
}
