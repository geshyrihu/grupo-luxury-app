import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-crud-inventario-productos',
  templateUrl: './crud-inventario-productos.component.html',
})
export class CrudInventarioProductosComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  form: FormGroup;
  cb_products: any[] = [];
  cb_measurementUnits: any = [];
  stokMaximo: 0;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private selectListSevice: SelectlistService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.dataService
      .get(
        `InventarioProducto/GetProductoDropdownDto/${authService.customerAuthId}`
      )
      .subscribe((resp: any) => {
        this.cb_products = resp.body;
      });
    this.selectListSevice.getMeasurementUnits().subscribe((resp) => {
      this.cb_measurementUnits = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;

    if (this.id !== 0) {
      this.onLoadItem();
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      customerId: [this.authService.customerAuthId, Validators.required],
      productoId: ['', Validators.required],
      existencia: [0, Validators.required],
      unidadDeMedidaId: ['', Validators.required],
      stockMin: [0, Validators.required],
      stockMax: [0, Validators.required],
      applicationUserId: [this.authService.InfoUserAuthDto.id],
    });
  }
  get inventarioProductoId() {
    return this.form.get('inventarioProductoId');
  }
  get productoId() {
    return this.form.get('productoId');
  }
  get existencia() {
    return this.form.get('existencia');
  }
  get stockMin() {
    return this.form.get('stockMin');
  }
  get stockMax() {
    return this.form.get('stockMax');
  }
  get unidadDeMedidaId() {
    return this.form.get('unidadDeMedidaId');
  }

  onLoadItem() {
    this.dataService.get(`InventarioProducto/${this.id}`).subscribe((resp) => {
      this.form.patchValue(resp.body);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    if (this.id === 0) {
      this.dataService.post(`InventarioProducto/`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`InventarioProducto/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro Actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
export interface InventarioProductoDetalle {
  id: number;
  inventarioProductoId: number;
  productoId: number;
  existencia: number;
  unidadDeMedidaId: number;
  stockMin: number;
  stockMax: number;
  compraRequerida: number;
  applicationUserId: string;
}
