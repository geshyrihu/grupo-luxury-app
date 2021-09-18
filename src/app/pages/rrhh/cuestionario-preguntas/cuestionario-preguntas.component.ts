import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { CuestionarioAddOrEditPreguntaComponent } from '../cuestionario-add-or-edit-pregunta/cuestionario-add-or-edit-pregunta.component';
import { CuestionarioAddOrEditRespuestasComponent } from '../cuestionario-add-or-edit-respuestas/cuestionario-add-or-edit-respuestas.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cuestionario-preguntas',
  templateUrl: './cuestionario-preguntas.component.html',
  providers: [DialogService, MessageService],
})
export class CuestionarioPreguntasComponent implements OnInit {
  ref: DynamicDialogRef;
  idCuestionario: number = 0;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.idCuestionario = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.onLoadData();
  }
  onLoadData() {
    this.dataService
      .get<any>(`Cuestionarios/GetCuestionarioPreguntas/${this.idCuestionario}`)
      .subscribe((resp: any) => {
        this.data = resp.body;
      });
  }

  onModalAddOrEditPregunta(data: any) {
    this.ref = this.dialogService.open(CuestionarioAddOrEditPreguntaComponent, {
      data: {
        id: data.id,
        idCuestionario: data.idCuestionario,
      },
      header: data.title,
      styleClass: 'anchoModal',
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
  onModalAddOrEditRespuesta(data: any) {
    this.ref = this.dialogService.open(
      CuestionarioAddOrEditRespuestasComponent,
      {
        data: {
          id: data.id,
          cuestionarioPreguntaId: data.cuestionarioPreguntaId,
        },
        header: data.title,
        styleClass: 'anchoModal',
        closeOnEscape: true,
        baseZIndex: 10000,
      }
    );
    this.ref.onClose.subscribe((resp: any) => {
      if (resp !== undefined) {
        this.onLoadData();
        this.showToast('success', 'Completado!!', resp);
      }
    });
  }

  onDeletePregunta(preguntaId: number) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CuestionarioPreguntas/${preguntaId}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }
  onDeleteRespuesta(respuestaId: number) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`PreguntaRespuestas/${respuestaId}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
