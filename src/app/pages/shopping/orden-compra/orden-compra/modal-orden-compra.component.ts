import { DateService } from 'src/app/shared/services/date.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { ClassField } from '@angular/compiler';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-modal-orden-compra',
  templateUrl: './modal-orden-compra.component.html',
  providers: [DialogService, MessageService],
})
export class ModalOrdenCompraComponent implements OnInit {
  ordenCompraId: number = 0;
  model: any;
  form = this.formBuilder.group({
    id: [0, Validators.required],
    fechaSolicitud: ['', Validators.required],
    equipoOInstalacion: ['', Validators.required],
    justificacionGasto: ['', Validators.required],
    urlFile: [''],
    applicationUserId: [''],
    folio: [''],
    folioSolicitudCompra: [''],
    customerId: [0],
  });

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private dateService: DateService
  ) {
    this.ordenCompraId = this.config.data.ordenCompra.id;
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.dataService
      .get(`OrdenCompra/${this.ordenCompraId}`)
      .subscribe((resp: any) => {
        resp.body.fechaSolicitud = this.dateService.getDateFormat(
          resp.body.fechaSolicitud
        );
        this.form.patchValue(resp.body);
      });
  }
  onSubmit() {
    this.dataService
      .put(`OrdenCompra/${this.ordenCompraId}`, this.form.value)
      .subscribe(
        (resp) => {
          this.ref.close('Datos Actualizados');
        },
        (err) => {
          console.log(err.error);
        }
      );
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
