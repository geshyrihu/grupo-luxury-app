import { Component, OnInit, Pipe } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { Observable, pipe } from 'rxjs';
import { formDateToString, nombreMes } from 'src/app/shared/helpers/utilities';
import { CustomerSelectService } from 'src/app/shared/services/customer-select.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { EMonth } from '../../shared/enums/EMonth';
import { AuthService } from './../../shared/services/auth.service';
const date = new Date();
const mesActual = date.getMonth();
const mesAnterior = new Date(date.getFullYear(), mesActual - 1, 1);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  url_User = `${environment.base_urlImg}Administration/accounts/`;
  url_Img = `${environment.base_urlImg}dashboard/`;
  customerId$: Observable<number>;
  // fechaInicial = new Date(date.getFullYear(), this.mesActual - 1, 1);
  fechaInicial = formDateToString(mesAnterior);
  fechaFinal = formDateToString(date);
  ordenesServicio: any[] = [];
  reportesOperacion: any[] = [];
  ordeneCompra: any[] = [];
  userCargaReport: any[] = [];
  minuta: any[] = [];
  callAdmin: any[] = [];
  tool: any[] = [];
  machinery: any[] = [];
  loading: boolean = true;
  pathLoading: string =
    'https://c.tenor.com/XK37GfbV0g8AAAAj/loading-cargando.gif';

  Colaborador: boolean = false;

  //Ordenes de Mantenimiento
  meses: any[] = EMonth.GetEnum();

  barChartLabels: any[] = [];
  dataTermiado: any[] = [];
  dataNoRealizado: any[] = [];
  constructor(
    private dbService: DashboardService,
    private customerSelectService: CustomerSelectService,
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.Colaborador = this.authService.validationRole('Colaborador');
    this.onLoadData();
    this.customerId$ = this.customerSelectService.getCustomerId$();
  }
  ngOnInit(): void {
    this.customerId$.subscribe((resp) => {
      this.onLoadData();
    });
  }

  onLoadData() {
    console.log('OnLoadData');
    console.log('Inicial: ', this.fechaInicial);
    console.log('Final: ', this.fechaFinal);
    this.onLoadReportesOperacion();
    this.onLoadOrdenServicio();
    this.onLoadOrdenCompra();
    this.onResponsableCagarReportes();
    this.onMinuta();
    this.onCallAdmin();
    this.onTool();
    this.onMachinery();
  }

  onLoadOrdenServicio() {
    this.barChartLabels = [];
    this.dataTermiado = [];
    this.dataNoRealizado = [];
    this.dataService
      .get(
        `Dashboard/OrdenesServicio/${this.customerSelectService.customerId}/${this.fechaInicial}/${this.fechaFinal}`
      )
      .subscribe(
        (resp: any) => {
          this.ordenesServicio = resp.body;
          if (this.ordenesServicio.length !== 0) {
            this.ordenesServicio.forEach((resp) => {
              this.dataTermiado.push(resp.porcentajePositivo);
              this.dataNoRealizado.push(resp.porcentajeNegativo);
              this.barChartLabels.push(
                nombreMes(resp.fecha.mes) + '-' + resp.fecha.year
              );
            });
          } else {
          }
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onLoadReportesOperacion() {
    this.dataService
      .get(
        `Dashboard/ReportesOperacion/${this.customerSelectService.customerId}/${this.fechaInicial}/${this.fechaFinal}`
      )
      .subscribe(
        (resp: any) => {
          this.reportesOperacion = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onLoadOrdenCompra() {
    this.loading = true;
    this.dataService
      .get(
        `Dashboard/OrdenCompra/${this.customerSelectService.customerId}/${this.fechaInicial}/${this.fechaFinal}`
      )
      .subscribe(
        (resp: any) => {
          this.ordeneCompra = resp.body;
          this.loading = false;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onResponsableCagarReportes() {
    this.dataService
      .get(
        `Dashboard/ResponsableCagarReportes/${this.customerSelectService.customerId}/${this.fechaInicial}/${this.fechaFinal}`
      )
      .subscribe(
        (resp: any) => {
          this.userCargaReport = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onMinuta() {
    this.dataService
      .get(`Dashboard/Minuta/${this.customerSelectService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.minuta = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onTool() {
    this.dataService
      .get(`Dashboard/Tool/${this.customerSelectService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.tool = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onMachinery() {
    this.dataService
      .get(`Dashboard/Machinery/${this.customerSelectService.customerId}`)
      .subscribe(
        (resp: any) => {
          this.machinery = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onCallAdmin() {
    this.dataService
      .get(
        `Dashboard/CallAdmin/${this.customerSelectService.customerId}/${this.fechaInicial}/${this.fechaFinal}`
      )
      .subscribe(
        (resp: any) => {
          this.callAdmin = resp.body;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
