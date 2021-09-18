import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { formDateToString, nombreMes } from 'src/app/shared/helpers/utilities';
import { DataService } from 'src/app/shared/services/data.service';
var date = new Date();
@Component({
  selector: 'app-dashboard-orden-servicio',
  templateUrl: './dashboard-orden-servicio.component.html',
})
export class DashboardOrdenServicioComponent implements OnInit, OnChanges {
  mesActual = date.getMonth();

  @Input()
  customerId: number = 0;
  @Input()
  fechaInicial = new Date(date.getFullYear(), this.mesActual - 1, 1);
  @Input()
  fechaFinal: Date = new Date();

  barChartLabels: any[] = [];
  dataTermiado: any[] = [];
  dataNoRealizado: any[] = [];

  ordenesServicio: any[] = [];

  constructor(private dataService: DataService) {}
  ngOnChanges(): void {
    this.onLoadOrdenServicio();
  }

  ngOnInit(): void {
    // this.onLoadOrdenServicio();
  }

  onLoadOrdenServicio() {
    this.barChartLabels = [];
    this.dataTermiado = [];
    this.dataNoRealizado = [];
    this.ordenesServicio = [];

    this.dataService
      .get(
        `Dashboard/OrdenesServicio/${this.customerId}/${formDateToString(
          this.fechaInicial
        )}/${formDateToString(this.fechaFinal)}`
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
          }
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
