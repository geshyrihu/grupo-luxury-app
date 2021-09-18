import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormBitacoraMantenimientoComponent } from '../../bitacora-mantenimiento/form-bitacora-mantenimiento/form-bitacora-mantenimiento.component';
import { FormCuadranteBitacoraMantenimientoComponent } from '../form-cuadrante-bitacora-mantenimiento/form-cuadrante-bitacora-mantenimiento.component';
const base_urlImg = environment.base_urlImg;
@Component({
  selector: 'app-index-bitacora-cuadrante',
  templateUrl: './index-bitacora-cuadrante.component.html',
  providers: [DialogService, MessageService],
})
export class IndexBitacoraCuadranteComponent implements OnInit {
  cuadranteBitacoraId: number = 0;
  data: any[] = [];
  urlImg: string = '';
  ref: DynamicDialogRef;
  isInRole = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private dataService: DataService,
    public messageService: MessageService,
    private authService: AuthService,
    public dialogService: DialogService
  ) {
    this.isInRole = this.authService.validationRole('Mantenimiento');
    this.cuadranteBitacoraId = this.rutaActiva.snapshot.params.id;
    this.urlImg = `${base_urlImg}customers/${this.authService.customerAuthId}/machinery/`;
  }

  ngOnInit(): void {
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
      .get(`BitacoraCuadrantes/GetAllEquipos/${this.cuadranteBitacoraId}`)
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
  onModalFormBiacora(data: any) {
    this.ref = this.dialogService.open(
      FormCuadranteBitacoraMantenimientoComponent,
      {
        data: {
          equipoId: data.id,
        },
        header: data.title,
        styleClass: 'anchoModal',
        closeOnEscape: true,
        baseZIndex: 10000,
      }
    );
    this.ref.onClose.subscribe((resp: any) => {
      this.onLoadData();
    });
  }

  delete(data: any) {
    this.dataService
      .delete(`BitacoraCuadrantes/DeleteEquipo/${data.id}`)
      .subscribe(
        (resp) => {
          this.showToast('info', 'Info', `Registro borrado!`);
          this.onLoadData();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al intentar borrar');
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
