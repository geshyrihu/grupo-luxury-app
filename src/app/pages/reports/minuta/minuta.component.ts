import { Router } from '@angular/router';
import { ReportService } from 'src/app/shared/services/report.service';
import { DataService } from '../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minuta',
  templateUrl: './minuta.component.html',
})
export class MinutaComponent implements OnInit {
  idMinuta: number = 0;
  data: any;
  order: string = 'responsibleArea.nameArea';

  minutaDetalles: any[] = [];
  constructor(
    private dataService: DataService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idMinuta = this.reportService.getIdMinuta();
    if (this.idMinuta === 0) {
      this.router.navigateByUrl('client/meetings');
    } else {
      this.dataService
        .get(`Meetings/MeetingReportDto/${this.idMinuta}`)
        .subscribe(
          (resp: any) => {
            this.data = resp.body;
          },
          (err) => {
            console.log(err.error);
          }
        );
      this.dataService
        .get(`Meetings/GetMeetingDetails/${this.idMinuta}`)
        .subscribe(
          (resp: any) => {
            this.minutaDetalles = resp.body;
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
