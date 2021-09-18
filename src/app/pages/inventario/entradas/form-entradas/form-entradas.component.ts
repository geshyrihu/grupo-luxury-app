import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { MessageService } from 'primeng/api';
import { DateService } from 'src/app/shared/services/date.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  formDateToString,
  formDateToStringLocale,
} from 'src/app/shared/helpers/utilities';

@Component({
  selector: 'app-form-entradas',
  templateUrl: './form-entradas.component.html',
  providers: [DialogService, MessageService],
})
export class FormEntradasComponent implements OnInit {
  form: FormGroup;
  id = 0;
  idProducto = 0;
  nombreProducto = '';
  cantidadActual = 0;
  cb_productos: any[] = [];
  cb_Unidad: any[] = [];
  cb_Proveedor: any[] = [];
  mostrarProductos = false;
  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService,
    private authService: AuthService
  ) {
    this.selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_Unidad = resp;
    });
    this.selectListService.getProviders().subscribe((resp) => {
      this.cb_Proveedor = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.config.data.idProducto == 0) {
      this.mostrarProductos = true;
    } else {
      this.mostrarProductos = false;
    }
    this.nombreProducto = this.config.data.nombreProducto;
    this.idProducto = this.config.data.idProducto;

    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: 0, disabled: true },
      providerId: ['', Validators.required],
      customerId: [this.authService.customerAuthId, Validators.required],
      fechaEntrada: [this.dateService.getDateNow(), Validators.required],
      productoId: [this.idProducto, Validators.required],
      cantidad: ['', Validators.required],
      unidadMedidaId: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      applicationUserId: [
        this.authService.InfoUserAuthDto.id,
        Validators.required,
      ],
    });
  }
  onLoadData() {
    this.dataSerivce.get(`EntradaProducto/${this.id}`).subscribe(
      (resp: any) => {
        this.nombreProducto = resp.body.nombreProducto;
        this.cantidadActual = resp.body.cantidad;
        this.form.patchValue(resp.body);
        this.form.patchValue({
          fechaEntrada: formDateToString(resp.body.fechaEntrada),
        });
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  get providerId() {
    return this.form.get('providerId');
  }
  get customerId() {
    return this.form.get('customerId');
  }
  get fechaEntrada() {
    return this.form.get('fechaEntrada');
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
  get numeroFactura() {
    return this.form.get('numeroFactura');
  }
  get applicationUserId() {
    return this.form.get('applicationUserId');
  }

  onSubmit() {
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post('EntradaProducto', this.form.value).subscribe(
        (resp) => {
          this.ref.close();
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(
          `EntradaProducto/${this.id}/${this.cantidadActual}`,
          this.form.value
        )
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
}

export interface EntradaProductoAddOrEditDto {
  customerId: number;
  fechaEntrada: string | null;
  productoId: number;
  cantidad: number;
  unidadMedidaId: number;
  numeroFactura: string;
  applicationUserId: string;
}
