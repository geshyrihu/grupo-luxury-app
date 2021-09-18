import { DataService } from '../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddBudgetCardDetailsComponent } from './add.component';
import { EditBudgetCardDetailsComponent } from './edit.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [DialogService, MessageService],
})
export class IndexBudgetCardDetailsComponent implements OnInit {
  autorizado: boolean = false;

  constructor(
    private pathActive: ActivatedRoute,
    private dataService: DataService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public authService: AuthService
  ) {
    this.idBudgetCard = pathActive.snapshot.params.id;
    this.autorizado = authService.validationRole('SuperUsuario');
  }

  data: any[] = [];
  idBudgetCard: number = 0;
  ref: DynamicDialogRef;

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(`CedulaPresupuestalDetalles/GetAllAsync/${this.idBudgetCard}`)
      .subscribe(
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
  onModalAdd() {
    this.ref = this.dialogService.open(AddBudgetCardDetailsComponent, {
      data: {
        idBudgetCard: this.idBudgetCard,
      },
      header: 'Agregar Partida',
      height: 'auto',
      width: '80%',
      styleClass: 'anchoModal',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.onLoadData();
        this.messageService.add({
          severity: 'success',
          summary: 'Completado!!',
          detail: resp,
        });
      }
    });
  }

  onModalEditar(data: any) {
    this.ref = this.dialogService.open(EditBudgetCardDetailsComponent, {
      data: {
        id: data.id,
        idBudgetCard: this.idBudgetCard,
      },
      header: data.title,
      height: 'auto',
      styleClass: 'anchoModal',
      baseZIndex: 10000,
      closeOnEscape: true,
    });
    this.ref.onClose.subscribe((resp: string) => {
      this.onLoadData();

      if (resp !== undefined) {
        this.onLoadData();
        this.messageService.add({
          severity: 'success',
          summary: 'Completado!!',
          detail: resp,
        });
      }
    });
  }

  onDelete(data: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CedulaPresupuestalDetalles/${data.id}`).subscribe(
      (resp) => {
        this.showToast('success', 'Completado!!', `Registro Elíminado`);
        Swal.close();
        this.onLoadData();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al intentar borrar');
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
