import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CuestionarioAddOrEditComponent } from '../cuestionario-add-or-edit/cuestionario-add-or-edit.component';
import { DataService } from 'src/app/shared/services/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  providers: [DialogService, MessageService],
})
export class CuestionarioComponent implements OnInit {
  data: any[] = [];
  isInRole: boolean;
  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isInRole = this.authService.validationRole('SuperUsuario');
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get<any[]>('Cuestionarios').subscribe(
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
  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`Cuestionarios/${data.id}`).subscribe(
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

  onModalAddOrEdit(data: any) {
    this.ref = this.dialogService.open(CuestionarioAddOrEditComponent, {
      data: {
        id: data.id,
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

  irPreguntas(id: number): void {
    this.router.navigateByUrl('rrhh/cuestionario/' + id);
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
