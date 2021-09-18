import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CaratulaFondeoService } from 'src/app/shared/services/caratula-fondeo.service';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ETipoGasto } from '../../../shared/enums/ETipoGasto';
import { FondeoDto, FondeoPdfDto } from './caratula.interface';

@Component({
  selector: 'app-caratula-fondeo',
  templateUrl: './caratula-fondeo.component.html',
})
export class CaratulaFondeoComponent implements OnInit {
  tipoGasto = ETipoGasto.GetEnum();
  form: FormGroup;
  customerId$: Observable<number>;
  data: FondeoPdfDto;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public ref: DynamicDialogRef,
    private customerSelectService: CustomerSelectService,
    private router: Router,
    private caratulaFondeoService: CaratulaFondeoService
  ) {
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      tipoGastoSelect: [0, Validators.required],
      cuenta: [''],
      datoPago: [''],
      entregadoPor: [''],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.dataService
      .get<FondeoDto>(
        `OrdenCompra/Fondeo/${this.customerSelectService.customerId}/${
          this.form.get('fechaInicial').value
        }/${this.form.get('fechaFinal').value}/
        ${this.form.get('tipoGastoSelect').value}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          this.caratulaFondeoService.data = resp.body;

          // this.exportExcel();
          this.caratulaFondeoService.setInfo(
            this.form.get('cuenta').value,
            this.form.get('datoPago').value,
            this.form.get('entregadoPor').value
          );

          this.router.navigateByUrl('shopping/caratulaFondeo');
          this.ref.close();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  get fechaInicial() {
    return this.form.get('fechaInicial');
  }
  get fechaFinal() {
    return this.form.get('fechaFinal');
  }
  get tipoGastoSelect() {
    return this.form.get('tipoGastoSelect');
  }
  get cuenta() {
    return this.form.get('cuenta');
  }
  get datoPago() {
    return this.form.get('datoPago');
  }
  get entregadoPor() {
    return this.form.get('entregadoPor');
  }
  exportExcel() {
    if (this.form.invalid) {
      return;
    }

    this.dataService
      .get(
        `OrdenCompra/Fondeo/${this.customerSelectService.customerId}/${
          this.form.get('fechaInicial').value
        }/${this.form.get('fechaFinal').value}/
        ${this.form.get('tipoGastoSelect').value}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body;
          this.forExcel(this.data);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  forExcel(data: any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
