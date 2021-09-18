import { AuthService } from '../../../shared/services/auth.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { DateService } from '../../../shared/services/date.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { MessageService } from 'primeng/api';
import { Time } from '@angular/common';

@Component({
  selector: 'app-crud-salidas',
  templateUrl: './crud-salidas.component.html',
  styles: [],
})
export class CrudSalidasComponent implements OnInit {
  form: FormGroup;
  id = 0;
  idProducto = 0;
  nombreProducto = '';
  cantidadActual = 0;
  cb_productos: any[] = [];
  cb_Unidad: any[] = [];
  existenciaActual: 0;
  dateTodat = new Date();
  noHaystock = '';
  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService,
    private authService: AuthService
  ) {
    // this.selectListService.getProducts().subscribe((resp) => {
    //   this.cb_productos = resp;
    // });
    this.selectListService.getMeasurementUnits().subscribe((resp) => {
      this.cb_Unidad = resp;
    });
  }

  ngOnInit(): void {
    // ...para obtener la cantidad actual de producto existentes
    this.dataSerivce
      .get(
        `InventarioProducto/GetExistenciaProducto/${this.authService.customerAuthId}/${this.config.data.idProducto}`
      )
      .subscribe((resp: any) => {
        this.existenciaActual = resp.body.existencia;
      });
    // ...para obtener la cantidad actual de producto existentes
    this.id = this.config.data.id;

    this.nombreProducto = this.config.data.nombreProducto;
    this.idProducto = this.config.data.idProducto;

    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: 0, disabled: true },
      customerId: [this.authService.customerAuthId, Validators.required],
      fechaSalida: [this.dateService.getDateNow(), Validators.required],
      productoId: [this.idProducto, Validators.required],
      cantidad: ['', Validators.required],
      unidadMedidaId: ['', Validators.required],
      usoPrducto: ['', Validators.required],
      quienUso: ['', Validators.required],
      horaSalida: [
        `${this.dateTodat.getHours()}:${this.dateTodat.getMinutes()}`,
        Validators.required,
      ],
      applicationUserId: [
        this.authService.InfoUserAuthDto.id,
        Validators.required,
      ],
    });
  }
  get customerId() {
    return this.form.get('customerId');
  }
  get fechaSalida() {
    return this.form.get('fechaSalida');
  }
  get horaSalida() {
    return this.form.get('horaSalida');
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
  get usoPrducto() {
    return this.form.get('usoPrducto');
  }
  get quienUso() {
    return this.form.get('quienUso');
  }
  get applicationUserId() {
    return this.form.get('applicationUserId');
  }
  onLoadData() {
    this.dataSerivce.get(`SalidaProductos/${this.id}`).subscribe(
      (resp: any) => {
        this.nombreProducto = resp.body.producto.nombreProducto;
        this.cantidadActual = resp.body.cantidad;
        resp.body.fechaSalida = this.dateService.getDateFormat(
          resp.body.fechaSalida
        );
        this.form.patchValue(resp.body);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  onSubmit() {
    if (this.form.value.cantidad > this.existenciaActual) {
      this.noHaystock = 'No hay suficiente stock';
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post('SalidaProductos', this.form.value).subscribe(
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
          `SalidaProductos/${this.id}/${this.cantidadActual}`,
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

export interface SalidaProductoAddOrEditDto {
  customerId: number;
  fechaSalida: Date;
  productoId: number;
  cantidad: number;
  unidadMedidaId: number;
  usoPrducto: string;
  quienUso: string;
  applicationUserId: string;
  horaSalida: Time;
}
