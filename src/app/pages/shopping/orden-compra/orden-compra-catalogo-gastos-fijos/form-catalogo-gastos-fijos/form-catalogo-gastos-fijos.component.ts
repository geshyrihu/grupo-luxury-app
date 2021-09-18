import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { MessageService, SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Output } from '@angular/core';
import { CatalogoGastosFijosService } from 'src/app/shared/services/catalogo-gastos-fijos.service';

@Component({
  selector: 'app-form-catalogo-gastos-fijos',
  templateUrl: './form-catalogo-gastos-fijos.component.html',
  providers: [MessageService],
})
export class FormCatalogoGastosFijosComponent implements OnInit {
  @Input()
  id: number = 0;

  anio = 2021;

  cb_usoCFDI: any[] = [];
  cb_metodoDePago: any[] = [];
  cb_formaDePago: any[] = [];

  cb_provdiers: any[] = [];
  proveedor: SelectItem;
  proveedorResult: any[] = [];
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    customerId: [this.authService.customerAuthId],
    equipoOInstalacion: ['', Validators.required],
    justificacionGasto: ['', Validators.required],
    providerId: ['', Validators.required],
    usoCFDIId: ['', Validators.required],
    metodoDePagoId: [19, Validators.required],
    formaDePagoId: [1, Validators.required],
    catalogoGastosFijosPresupuesto: this.formBuilder.array([]),
    catalogoGastosFijosDetalles: this.formBuilder.array([]),
    applicationUserId: [this.authService.InfoUserAuthDto.id],
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService,
    public messageService: MessageService,
    private catalogoGastosFijosService: CatalogoGastosFijosService
  ) {
    this.selectListService.getProviders().subscribe((resp) => {
      this.cb_provdiers = resp;
    });
    this.selectListService.getUseCFDI().subscribe((resp) => {
      this.cb_usoCFDI = resp;
    });
    this.selectListService.getPaymentMethod().subscribe((resp) => {
      this.cb_metodoDePago = resp;
    });
    this.selectListService.getWayToPay().subscribe((resp) => {
      this.cb_formaDePago = resp;
    });

    this.id = this.catalogoGastosFijosService.getCatalogoGastosFijosId();
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  filtrarProveedor(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_provdiers.length; i++) {
      let item = this.cb_provdiers[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.proveedorResult = filtered;
  }

  onLoadData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando información...',
    });
    Swal.showLoading();
    this.dataService.get<any>(`CatalogoGastosFijos/${this.id}`).subscribe(
      (resp: any) => {
        this.catalogoGastosFijosService.setCatalogoGastosFijosId(resp.body.id);

        this.form.patchValue(resp.body);

        this.proveedor = {
          label: resp.body.provider,
          value: resp.body.providerId,
        };
        Swal.close();
      },
      (err) => {
        this.showToast('error', 'Error!!', 'Ha ocurrido un error');
        Swal.close();
        console.log(err.error);
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.controls['providerId'].setValue(this.proveedor.value);
    if (this.id === 0) {
      this.dataService.post(`CatalogoGastosFijos`, this.form.value).subscribe(
        (resp: any) => {
          this.showToast('success', 'Creado!!', '');
          this.id = resp.body.id;
          this.onLoadData();
        },
        (err) => {
          this.showToast('error', 'Error!!', 'Ha ocurrido un error');
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`CatalogoGastosFijos/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.onLoadData();
            this.showToast('success', 'Actualizado!!', '');
            // this.ref.close('Registro actualizado');
          },
          (err) => {
            this.showToast('error', 'Error!!', 'Ha ocurrido un error');
            console.log(err.error);
          }
        );
    }
  }

  get equipoOInstalacion() {
    return this.form.get('equipoOInstalacion');
  }
  get justificacionGasto() {
    return this.form.get('justificacionGasto');
  }
  get providerId() {
    return this.form.get('providerId');
  }
  get usoCFDIId() {
    return this.form.get('usoCFDIId');
  }
  get metodoDePagoId() {
    return this.form.get('metodoDePagoId');
  }
  get formaDePagoId() {
    return this.form.get('formaDePagoId');
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
