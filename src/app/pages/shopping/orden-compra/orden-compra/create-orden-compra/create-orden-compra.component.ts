import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { formDateToString } from 'src/app/shared/helpers/utilities';

@Component({
  selector: 'app-create-orden-compra',
  templateUrl: './create-orden-compra.component.html',
})
export class CreateOrdenCompraComponent implements OnInit {
  solicitudCompraId: number = 0;
  solicitudCompra: any;
  ordenCompraId = 0;
  form: FormGroup;
  date: string = '';
  proveedorIdRecibido: number = 0;
  posicionCotizacion: number = 0;

  constructor(
    private dataService: DataService,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) {
    this.solicitudCompraId = this.config.data.solicitudCompraId;
    this.proveedorIdRecibido = this.config.data.proveedorId;
    this.posicionCotizacion = this.config.data.posicionCotizacion;
    if (this.posicionCotizacion === undefined) {
      this.posicionCotizacion = 0;
    }
    if (this.proveedorIdRecibido === undefined) {
      this.proveedorIdRecibido = 0;
    }
    this.date = formDateToString(new Date());
  }

  ngOnInit(): void {
    if (this.solicitudCompraId !== undefined) {
      this.onLoadSolicitudCompra();
    }
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      customerId: [this.authService.customerAuthId, Validators.required],
      folio: [''],
      fechaSolicitud: [this.date, Validators.required],
      folioSolicitudCompra: [''],
      urlFile: [''],
      equipoOInstalacion: ['', Validators.required],
      justificacionGasto: ['', Validators.required],
      revisadoPorResidente: [''],
      applicationUserId: [this.authService.InfoUserAuthDto.id],
    });
  }

  onLoadSolicitudCompra() {
    this.dataService
      .get(`SolicitudCompra/${this.solicitudCompraId}`)
      .subscribe((resp: any) => {
        this.solicitudCompra = resp.body;
        this.form.controls['equipoOInstalacion'].setValue(
          resp.body.equipoOInstalacion
        );
        this.form.controls['justificacionGasto'].setValue(
          resp.body.justificacionGasto
        );
        this.form.controls['folioSolicitudCompra'].setValue(
          this.config.data.folioSolicitudCompra
        );
      });
  }
  onSubmit() {
    this.ref.close();
    if (this.form.invalid) {
      return;
    }
    if (this.ordenCompraId === 0) {
      this.dataService
        .post(
          `OrdenCompra/${this.proveedorIdRecibido}/${this.posicionCotizacion}`,
          this.form.value
        )
        .subscribe(
          (resp: any) => {
            this.ref.close(resp.body.id);
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put(`OrdenCompra/${this.ordenCompraId}`, this.form.value)
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
  get customerId() {
    return this.form.get('customerId');
  }
  get folio() {
    return this.form.get('folio');
  }
  get fechaSolicitud() {
    return this.form.get('fechaSolicitud');
  }
  get equipoOInstalacion() {
    return this.form.get('equipoOInstalacion');
  }
  get justificacionGasto() {
    return this.form.get('justificacionGasto');
  }
  get urlFile() {
    return this.form.get('urlFile');
  }
}
