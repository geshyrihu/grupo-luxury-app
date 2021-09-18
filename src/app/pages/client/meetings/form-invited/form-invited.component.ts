import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-invited',
  templateUrl: './form-invited.component.html',
})
export class FormInvitedComponent implements OnInit {
  @Input()
  customerId: number;
  @Input()
  meetingId: number;
  form: FormGroup;
  participantsList: any[] = [];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.onLoadData();
    this.onLoadForm();
  }

  onLoadForm() {
    this.form = this.formBuilder.group({
      meetingPositionId: [12, Validators.required],
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
      .get(`MeetingParticipants/Invitado/${this.meetingId}`)
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
