import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  templateUrl: './edit-producto.component.html',
})
export class EditProductoComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  data: any;
  solicitudCompraId: number = 0;
  cb_unidadMedida: any[] = [];
  cb_Productos: any[] = [];
  form: FormGroup;
  nombreProducto = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private selectListService: SelectlistService,
    private authService: AuthService
  ) {
    selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_unidadMedida = resp;
    });
    selectListService.getProducts().subscribe((resp) => {
      this.cb_Productos = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    this.solicitudCompraId = this.config.data.solicitudCompraId;
    this.onLoadProduct();
    this.form = this.formBuilder.group({
      id: [0],
      solicitudCompraId: [
        this.config.data.solicitudCompraId,
        { validators: [Validators.required] },
      ],
      productoId: [0, { validators: [Validators.required] }],
      cantidad: [0, { validators: [Validators.required] }],
      unidadMedidaId: [0, { validators: [Validators.required] }],
      applicationUserId: [
        this.authService.InfoUserAuthDto.id,
        { validators: [Validators.required] },
      ],
    });
  }

  onLoadProduct() {
    this.dataService
      .get<any>(`SolicitudCompraDetalle/EditProduct/${this.id}`)
      .subscribe((resp: any) => {
        this.data = resp.body;
        this.nombreProducto = resp.body.nombreProducto;
        this.form.patchValue(resp.body);
      });
  }

  get productoId() {
    return this.form.get('productoId');
  }
  get cantidad() {
    return this.form.get('cantidad');
  }
  get unidadMedidaId() {
    return this.form.get('unidadMedidaId');
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }

    this.data.cantidad = this.form.get('cantidad').value;
    this.data.unidadMedidaId = this.form.get('unidadMedidaId').value;
    this.data.solicitudCompraId = this.form.get('solicitudCompraId').value;
    this.dataService
      .put<any>(`SolicitudCompraDetalle/${this.id}`, this.data)
      .subscribe(
        (resp) => {
          this.ref.close('Registro Actualizada');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
