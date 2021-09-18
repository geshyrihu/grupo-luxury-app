import { AuthService } from '../../../../shared/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-orden-compra-denegada',
  templateUrl: './orden-compra-denegada.component.html',
})
export class OrdenCompraDenegadaComponent implements OnInit {
  ordenCompraId: number = 0;
  ordenCompraAuthId: number = 0;
  form = this.formBuilder.group({
    id: [],
    ordenCompraId: [],
    fechaAutorizacion: [],
    statusOrdenCompra: [],
    observaciones: [''],
    applicationUserAuthId: [],
  });
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.ordenCompraId = this.config.data.ordenCompraId;
    this.ordenCompraAuthId = this.config.data.ordenCompraAuthId;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.ordenCompraAuthId],
      ordenCompraId: [this.ordenCompraId],
      fechaAutorizacion: [''],
      statusOrdenCompra: [1],
      observaciones: ['', Validators.required],
      applicationUserAuthId: [this.authService.InfoUserAuthDto.id],
    });
  }

  onSubmit() {
    this.dataService
      .put(
        `OrdenCompraAuth/NoAutorizada/${this.ordenCompraAuthId}/${this.authService.InfoUserAuthDto.id}`,
        this.form.value
      )
      .subscribe(
        (resp) => {
          this.ref.close('Actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  get observaciones() {
    return this.form.get('observaciones');
  }
}
