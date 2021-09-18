import { Component, OnInit } from '@angular/core';
import { CaratulaFondeoService } from 'src/app/shared/services/caratula-fondeo.service';
import { MenuItem } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FondeoPdfDto } from '../caratula.interface';
const date: Date = new Date();

@Component({
  selector: 'app-vista-caratula-fondeo',
  templateUrl: './vista-caratula-fondeo.component.html',
  styleUrls: ['vista-caratula-fondeo.css'],
})
export class VistaCaratulaFondeoComponent implements OnInit {
  data: any;
  dataSelect: any;
  items: MenuItem[];
  cols: any[];
  logoLuxury = `${environment.base_urlImg}logo2.jpg`;
  nameCustomer: string = '';
  logoCustomer: string = '';
  photoPath: string = '';
  cuenta: string = '';
  datosPago: string = '';

  totalImporte: number = 0;
  totalSubTotal: number = 0;
  totalTotales: number = 0;
  totalIva: number = 0;
  totalRetencion: number = 0;

  pdfTitulo: string = 'Reporte de Cuentas por Pagar';
  pdfAuthor: string = 'Grupo Luxury Building';

  user: string = '';

  constructor(
    private caratulaFondeoService: CaratulaFondeoService,
    private authService: AuthService,
    private dataService: DataService,
    private customerService: CustomerSelectService
  ) {
    if (this.caratulaFondeoService.data !== undefined) {
      this.onLoadCustomer();
    }
  }

  ngOnInit(): void {
    if (this.caratulaFondeoService.data !== undefined) {
      this.items = [
        {
          label: 'Eliminar',
          icon: 'pi pi-times',
          command: () => this.viewItem(this.dataSelect),
        },
      ];
    }
  }

  onLoadCustomer() {
    let ruta: string = '';
    this.dataService
      .get(`Customers/${this.customerService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.photoPath = resp.body.photoPath;
          this.nameCustomer = this.authService.InfoUserAuthDto.customer;
          this.logoCustomer = `${environment.base_urlImg}Administration/customer/${this.photoPath}`;
          this.cuenta = this.caratulaFondeoService.cuenta;
          this.datosPago = this.caratulaFondeoService.datosPago;
          this.user = this.caratulaFondeoService.entregadoPor;

          this.data = this.caratulaFondeoService.data;
          this.onLoadTotals(this.data);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  viewItem(model: any) {
    var i = this.data.fondeoDto.indexOf(model);
    if (i !== -1) {
      this.data.fondeoDto.splice(i, 1);
    }
    this.onLoadTotals(this.data.fondeoDto);
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
  onLoadTotals(data: any): void {
    let totalImporte: number = 0;
    let totalTotales: number = 0;
    let totalIva: number = 0;
    let totalRetencion: number = 0;

    for (let n of data) {
      totalImporte += n.importe;
    }

    for (let n of data) {
      totalTotales += n.totales;
    }
    for (let n of data) {
      totalIva += n.iva;
    }
    for (let n of data) {
      totalRetencion += n.retencion;
    }

    this.totalImporte = totalImporte;
    this.totalTotales = totalTotales;
    this.totalIva = totalIva;
    this.totalRetencion = totalRetencion;
  }
}
