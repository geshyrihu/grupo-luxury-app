import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { ETipoGasto } from 'src/app/shared/enums/ETipoGasto';

@Component({
  selector: 'app-orden-compra-datos-pago',
  templateUrl: './orden-compra-datos-pago.component.html',
})
export class OrdenCompraDatosPagoComponent implements OnInit {
  ordenCompraDatosPagoId = 0;
  cb_provider: any[] = [];
  cb_formaPago: any[] = [];
  cb_metodoPago: any[] = [];
  cb_usoCfdi: any[] = [];
  cb_tipoGasto = ETipoGasto.GetEnum();
  form = this.formBuilder.group({
    id: [0],
    ordenCompraId: [0],
    formaDePagoId: [0],
    metodoDePagoId: [0],
    providerId: [0],
    usoCFDIId: [0],
    tipoGasto: [0],
  });

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private selectListService: SelectlistService
  ) {
    this.ordenCompraDatosPagoId =
      this.config.data.ordenCompra.ordenCompraDatosPago.id;
    this.selectListService.getProviders().subscribe((resp) => {
      this.cb_provider = resp;
    });
    this.selectListService.getPaymentMethod().subscribe((resp) => {
      this.cb_metodoPago = resp;
    });
    this.selectListService.getUseCFDI().subscribe((resp) => {
      this.cb_usoCfdi = resp;
    });
    this.selectListService.getWayToPay().subscribe((resp) => {
      this.cb_formaPago = resp;
    });
  }

  ngOnInit(): void {
    this.dataService
      .get(`OrdenCompraDatosPago/${this.ordenCompraDatosPagoId}`)
      .subscribe(
        (resp) => {
          this.form.patchValue(resp.body);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onSubmit() {
    this.dataService
      .put(
        `OrdenCompraDatosPago/${this.ordenCompraDatosPagoId}`,
        this.form.value
      )
      .subscribe(
        (resp) => {
          this.ref.close('Datos Actualizados');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
