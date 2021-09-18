import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import {
  formDateToString,
  formDateToStringLocale,
  nombreMes,
} from 'src/app/shared/helpers/utilities';
import { DataService } from 'src/app/shared/services/data.service';

var date = new Date();
@Component({
  selector: 'app-chart-lectura',
  templateUrl: './chart-lectura.component.html',
})
export class ChartLecturaComponent implements OnInit {
  data: any;
  medidorId: number = 0;
  fechaInicial: Date;
  fechaFinal: Date;
  firstMonth: Date;
  secondMonth: Date;
  options;
  constructor(
    private rutaActiva: ActivatedRoute,
    private dataService: DataService
  ) {
    this.medidorId = this.rutaActiva.snapshot.params.id;
    this.options = {
      title: {
        display: true,
        text: 'Consumos',
        fontSize: 16,
      },
      legend: {
        position: 'bottom',
      },
    };
  }

  ngOnInit(): void {
    this.onSetFechaInitial();
    this.onLoadData();
  }

  onSetFechaInitial() {
    var date = new Date();

    date.setDate(date.getDate() - 30);
    this.fechaInicial = date;
    this.fechaFinal = new Date();
  }

  onLoadData() {
    this.data = [];
    this.dataService
      .get(
        `MedidorLectura/DataGraficoDiaria/${this.medidorId}/${formDateToString(
          this.fechaInicial
        )}/${formDateToString(this.fechaFinal)}`
      )
      .subscribe(
        (resp: any) => {
          console.log(resp.body);
          let labels: any[] = [];
          let lecturas: any[] = [];
          resp.body.forEach((item) => {
            labels.push(formDateToStringLocale(item.fecha));
          });
          resp.body.forEach((item) => {
            lecturas.push(item.lectura);
          });

          this.data = {
            labels: labels,
            datasets: [
              {
                label: 'consumo',
                backgroundColor: '#42A5F5',
                data: lecturas,
              },
            ],
          };
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  buscarPorMes() {
    this.data = [];
    this.dataService
      .get(
        `MedidorLectura/DataGraficoMensual/${this.medidorId}/${formDateToString(
          this.firstMonth
        )}/${formDateToString(this.secondMonth)}`
      )
      .subscribe(
        (resp: any) => {
          let labels: any[] = [];
          let lecturas: any[] = [];
          resp.body.forEach((item) => {
            labels.push(nombreMes(item.fecha));
          });
          resp.body.forEach((item) => {
            lecturas.push(item.lecturas);
          });
          this.data = {
            labels: labels,
            datasets: [
              {
                label: 'consumo',
                backgroundColor: '#42A5F5',
                data: lecturas,
              },
            ],
          };
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
