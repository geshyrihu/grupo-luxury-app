import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogoGastosFijosService } from 'src/app/shared/services/catalogo-gastos-fijos.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';
const fechaActual = new Date();
@Component({
  selector: 'app-form-gastos-fijos-presupuesto',
  templateUrl: './form-gastos-fijos-presupuesto.component.html',
})
export class FormGastosFijosPresupuestoComponent implements OnInit {
  anio: number = fechaActual.getFullYear();
  data: any[] = [];
  presupuestoAgregados: any[] = [];
  total: number = 0;
  catalogoGastosFijosId: number = 0;
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private catalogoGastosFijosService: CatalogoGastosFijosService
  ) {
    this.catalogoGastosFijosId =
      this.catalogoGastosFijosService.getCatalogoGastosFijosId();
  }

  ngOnInit(): void {
    this.onLoadData();
    this.onLoadPresupuestoAgregados();
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService
      .get(
        `OrdenCompraPresupuesto/GetAllForGastosFijos/${this.authService.customerAuthId}/${this.anio}/${this.catalogoGastosFijosId}`
      )
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

  onSubmit(partidaPresupuestal: any) {
    const model = {
      cedulaPresupuestalDetalleId:
        partidaPresupuestal.cedulaPresupuestalDetalleId,
      dineroUsado: partidaPresupuestal.dineroUsado,
      catalogoGastosFijosId: this.catalogoGastosFijosId,
    };
    this.dataService.post(`CatalogoGastosFijosPresupuesto`, model).subscribe(
      (resp) => {
        this.onLoadData();
        this.onLoadPresupuestoAgregados();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  actualizarAnio() {
    const anioString = String(this.anio);
    if (anioString.length === 4) {
      this.onLoadData();
    } else {
      return;
    }
  }
  onLoadPresupuestoAgregados() {
    this.dataService
      .get(
        `CatalogoGastosFijosPresupuesto/PresupuestoOrdenCompraFijos/${this.catalogoGastosFijosId}`
      )
      .subscribe(
        (resp: any) => {
          this.presupuestoAgregados = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  deletePresupuestoAgregado(id: number) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`CatalogoGastosFijosPresupuesto/${id}`).subscribe(
      (resp) => {
        Swal.close();
        this.showToast('info', 'Info', `Registro borrado!`);
        Swal.close();
        this.onLoadData();
        this.onLoadPresupuestoAgregados();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Error al borrar');
        Swal.close();
        console.log(err.error);
      }
    );
    Swal.close();
  }

  onUpdatePresupuestoAgregado(item: any) {
    this.dataService
      .put(`CatalogoGastosFijosPresupuesto/${item.id}`, item)
      .subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', 'Agregado...');
          this.onLoadPresupuestoAgregados();
          this.onLoadData();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
