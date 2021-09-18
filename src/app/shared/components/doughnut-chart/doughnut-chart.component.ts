import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
})
export class DoughnutChartComponent implements OnInit {
  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  // public doughnutChartLabels: Label[] = [
  //   'Download Sales',
  //   'In-Store Sales',
  //   'Mail-Order Sales',
  // ];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  colors: Color[] = [
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
    { backgroundColor: ['#70AD47', '#FF0000'] },
  ];
  @Input()
  public doughnutChartLabels: Label[] = [];
  @Input()
  public doughnutChartData: MultiDataSet = [];
  constructor() {}

  ngOnInit(): void {}
}
