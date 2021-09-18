import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from '../../../shared/services/date.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EAdvanced } from '../../../shared/enums/EAdvanced';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectlistService } from '../../../shared/services/selectlist.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addOrEditMeetingDetail',
  templateUrl: './addOrEditMeetingDetail.component.html',
})
export class AddOrEditMeetingDetailComponent implements OnInit {
  idMeeting: number = 0;
  statusId: number = 0;
  data: any[] = [];
  addItem: Boolean;
  cb_responsibleArea: any[] = [];
  form: FormGroup;
  advancedList: any[] = EAdvanced.GetEnum();
  formItem: FormGroup[];
  isInRoleSupervisor = false;
  constructor(
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private selectListService: SelectlistService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    selectListService.getResponsibleArea().subscribe((resp) => {
      this.cb_responsibleArea = resp;
    });

    this.isInRoleSupervisor = this.authService.validationRole(
      'SupervisionOperativa'
    );
  }
  ngOnInit() {
    this.idMeeting = this.config.data.id;
    this.addItem = false;
    if (this.config.data.header === 'Asuntos') {
      this.statusId = 0;
      this.onLoadData();
    }
    if (this.config.data.header === 'Pendientes') {
      this.statusId = 1;
      this.onLoadData();
    }
  }
  orderData(value: any) {
    this.data.sort();
  }
  convertirFecha(item: any) {
    return this.dateService.getDateFormat(item);
  }

  onLoadData() {
    this.dataService
      .get(`MeetingsDetails/GetAll/${this.idMeeting}/${this.statusId}`)
      .subscribe((resp: any) => {
        this.data = resp.body;
        this.data.forEach((resp) => {
          resp.deliveryDate = this.dateService.getDateFormat(resp.deliveryDate);
        });
      });
    this.addItem = false;
  }

  createForm() {
    this.addItem = true;
    this.form = this.formBuilder.group({
      id: [0],
      advance: [0, Validators.required],
      deliveryDate: [this.dateService.getDateNow(), Validators.required],
      meetingId: [this.idMeeting, Validators.required],
      observations: [''],
      requestService: ['', Validators.required],
      responsibleAreaId: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  get advance() {
    return this.form.get('advance');
  }
  get deliveryDate() {
    return this.form.get('deliveryDate');
  }
  get meetingId() {
    return this.form.get('meetingId');
  }
  get observations() {
    return this.form.get('observations');
  }
  get requestService() {
    return this.form.get('requestService');
  }
  get responsibleAreaId() {
    return this.form.get('responsibleAreaId');
  }
  get title() {
    return this.form.get('title');
  }
  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    const model: any = this.form.value;
    model.status = this.setStatus(this.form.get('advance').value);

    this.dataService.post('MeetingsDetails', model).subscribe((resp) => {
      this.onLoadData();
      this.showToast('success', 'Completado!!', 'Datos actualizados');
    });
  }

  setStatus(item: number) {
    if (item == -1) {
      return 2;
    }
    if (item == 100) {
      return 1;
    }
    if (item >= 0 && item < 100) {
      return 0;
    }
  }
  onUpdate(item: any) {
    const model: any = item;
    model.status = this.setStatus(model.advance);
    this.dataService
      .put(
        `MeetingsDetails/${item.id}/${this.authService.InfoUserAuthDto.id}`,
        model
      )
      .subscribe(
        (resp) => {
          this.onLoadData();
          this.showToast('success', 'Completado!!', 'Datos actualizados');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  onDelete(id: number) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`MeetingsDetails/${id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Completado!!', 'Registro eliminado');
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        Swal.close();
        console.log(err.error);
      }
    );
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
