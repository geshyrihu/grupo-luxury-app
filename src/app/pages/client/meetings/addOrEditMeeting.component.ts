import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from '../../../shared/services/date.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ETypeMeeting } from '../../../shared/enums/ETypeMeeting';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MeetingDto } from './interfaces/MeetingDto';

@Component({
  selector: 'app-addOrEditMeeting',
  templateUrl: './addOrEditMeeting.component.html',
})
export class AddOrEditMeetingComponent implements OnInit {
  id: any = 0;
  idNew: number;
  customerId: number;
  participantInvitado: any[] = [];
  cb_typeMeeting = ETypeMeeting.GetEnum();
  // Area minuta
  form: FormGroup;
  constructor(
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    public messageService: MessageService
  ) {
    this.customerId = this.config.data.customerId;

    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      date: [this.dateService.getDateNow(), Validators.required],
      eTypeMeeting: ['', Validators.required],
      customerId: [this.customerId],
      user: [null],
    });
  }

  get date() {
    return this.form.get('date');
  }
  get eTypeMeeting() {
    return this.form.get('eTypeMeeting');
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      const model: MeetingDto = this.form.value;

      if (this.id !== 0) {
        this.dataService.put(`Meetings/${this.id}`, model).subscribe(
          (resp: any) => {
            this.onLoadData();
            this.showToast('success', 'Completado!!', 'Actualizado');
          },
          (err) => {
            console.log(err.error);
            this.showToast('error', 'Error!!', 'a ocurrido un error');
          }
        );
      } else {
        this.dataService.post(`Meetings`, model).subscribe(
          (resp: any) => {
            this.id = resp.body.id;
            this.onLoadData();
            this.showToast('success', 'Completado!!', 'Creado');
          },
          (err) => {
            this.showToast('error', 'Error!!', 'a ocurrido un error');
          }
        );
      }
    }
  }

  onLoadData() {
    this.dataService.get(`Meetings/${this.id}`).subscribe((resp: any) => {
      resp.body.date = this.dateService.getDateFormat(resp.body.date);
      this.form.patchValue(resp.body);
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
