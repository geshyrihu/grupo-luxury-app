import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comite',
  templateUrl: './form-comite.component.html',
})
export class FormComiteComponent implements OnInit {
  @Input()
  customerId: number;
  @Input()
  meetingId: number;
  form: FormGroup;
  cb_ParticipantComite: any[] = [];
  cb_Comite: any[] = [];
  participantsList: any[] = [];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private selectlistService: SelectlistService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.onLoadCB();
    this.onLoadData();
    this.onLoadForm();
  }
  onLoadCB() {
    this.selectlistService
      .getListCondomino(this.customerId)
      .subscribe((resp) => {
        this.cb_ParticipantComite = resp;
      });
    this.selectlistService.getMeetingPositionComite().subscribe((resp) => {
      this.cb_Comite = resp;
    });
  }
  onLoadForm() {
    this.form = this.formBuilder.group({
      meetingPositionId: ['', Validators.required],
      name: ['', Validators.required],
      meetingId: [this.meetingId],
    });
  }
  onSubmit() {
    this.dataService.post(`MeetingParticipants`, this.form.value).subscribe(
      (resp: any) => {
        this.form.reset();
        this.form.patchValue({ meetingId: this.meetingId });
        this.showToast('success', 'Completado!!', 'Participante agregado');
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al guardar');
      }
    );
  }
  onDelete(idParticipant: number): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`MeetingParticipants/${idParticipant}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', `Registro Borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    this.onLoadData();
  }
  get meetingPosition() {
    return this.form.get('meetingPositionId');
  }
  get name() {
    return this.form.get('name');
  }
  onLoadData() {
    // ... Carga de lista de participantes
    this.dataService
      .get(`MeetingParticipants/Comite/${this.meetingId}`)
      .subscribe((resp: any) => {
        this.participantsList = resp.body;
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
