import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit, OnChanges {
  customerId$: Observable<number>;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  @Input()
  barChartLabels: Label[] = [];
  @Input()
  dataTermiado: any[] = [];
  @Input()
  dataNoRealizado: any[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];
  constructor() {}
  ngOnChanges(): void {
    this.onLoadData();
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.barChartData = [
      {
        data: this.dataTermiado,
        label: 'Terminado',
        backgroundColor: 'rgba(60, 179, 113,0.5)',
        hoverBackgroundColor: 'rgba(60, 179, 113,0.5)',
      },
      {
        data: this.dataNoRealizado,
        label: 'No Realizado',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        hoverBackgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ];
  }
}
