import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EDay } from '../../../shared/enums/EDay';
import { EMonth } from '../../../shared/enums/EMonth';
import { ERecurrence } from '../../../shared/enums/ERecurrence';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditMaintenanceCalendarsComponent implements OnInit {
  idUser = this.authService.InfoUserAuthDto.id;
  idMachinery: number = 0;
  cb_recurrencia: any[] = ERecurrence.GetEnum();
  cb_day: SelectItem[] = EDay.GetEnum();
  cb_month: any[] = EMonth.GetEnum();
  cb_Machinery: any[] = [];
  cb_Providers: any[] = [];

  id: any = 0;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private selectListService: SelectlistService
  ) {}

  ngOnInit(): void {
    this.selectListService.getMachinery().subscribe((resp: any) => {
      this.cb_Machinery = resp;
    });
    this.selectListService.getProviders().subscribe((resp: any) => {
      this.cb_Providers = resp;
    });
    this.idMachinery = this.config.data.idMachinery;

    switch (this.config.data.task) {
      case 'create': {
        break;
      }
      case 'edit': {
        this.onLoadData();
        break;
      }
      case 'copy': {
        this.LoadCopy();

        break;
      }
      default: {
        break;
      }
    }
    this.onLoadForm();
  }
  form: FormGroup;
  onLoadForm() {
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      activity: ['', Validators.required],
      day: ['', Validators.required],
      machineryId: [this.idMachinery, Validators.required],
      month: ['', Validators.required],
      observation: [''],
      price: ['', Validators.required],
      providerId: ['', Validators.required],
      recurrence: ['', Validators.required],
      typeMaintance: [0, Validators.required],
      customerId: [this.authService.customerAuthId],
    });
  }
  LoadCopy() {
    this.dataService
      .get(`MaintenanceCalendars/Get/${this.config.data.id}`)
      .subscribe((resp: any) => {
        this.id = 0;
        this.form.patchValue(resp.body);
      });
  }
  onLoadData() {
    this.dataService
      .get(`MaintenanceCalendars/Get/${this.config.data.id}`)
      .subscribe((resp: any) => {
        this.id = resp.body.id;
        this.form.patchValue(resp.body);
      });
  }

  get activity() {
    return this.form.get('activity');
  }
  get day() {
    return this.form.get('day');
  }
  get machineryId() {
    return this.form.get('machineryId');
  }
  get month() {
    return this.form.get('month');
  }
  get observation() {
    return this.form.get('observation');
  }
  get price() {
    return this.form.get('price');
  }
  get providerId() {
    return this.form.get('providerId');
  }
  get recurrence() {
    return this.form.get('recurrence');
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    if (this.id === 0) {
      this.dataService
        .post(`MaintenanceCalendars/${this.idUser}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put(`MaintenanceCalendars/${this.idUser}/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
