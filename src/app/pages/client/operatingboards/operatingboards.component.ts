import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectlistService } from '../../../shared/services/selectlist.service';

@Component({
  selector: 'app-operatingboards',
  templateUrl: './operatingboards.component.html',
  styles: [],
})
export class OperatingboardsComponent implements OnInit {
  dataCustomers: any[] = [];
  data: any[] = [];
  timeMtto = 0;
  timeOperacion = 0;
  timeContabilidad = 0;
  timeRRHH = 0;
  timeLegal = 0;
  times: any[] = [
    { valor: 5 },
    { valor: 10 },
    { valor: 15 },
    { valor: 20 },
    { valor: 30 },
    { valor: 40 },
    { valor: 45 },
    { valor: 60 },
  ];
  timeTotal: number;
  dataMtto: any[] = [];
  dataOperacion: any[] = [];
  dataContabilidad: any[] = [];
  dataRRHH: any[] = [];
  dataLegal: any[] = [];

  activarStatusInicial = false;
  constructor(
    private selectListService: SelectlistService,
    private http: HttpClient
  ) {
    this.GetData();
  }
  GetData() {
    const Url = 'https://localhost:44388/';
    this.http
      .get(Url + 'MeetingSupervisions/Filter/Mantenimiento')
      .subscribe((resp: any) => {
        this.dataMtto = resp;
      });
    this.http
      .get(Url + 'MeetingSupervisions/Filter/Residente')
      .subscribe((resp: any) => {
        this.dataOperacion = resp;
      });
    this.http
      .get(Url + 'MeetingSupervisions/Filter/Contabilidad')
      .subscribe((resp: any) => {
        this.dataContabilidad = resp;
      });
    this.http
      .get(Url + 'MeetingSupervisions/Filter/RRHH')
      .subscribe((resp: any) => {
        this.dataRRHH = resp;
      });
    this.http
      .get(Url + 'MeetingSupervisions/Filter/Legal')
      .subscribe((resp: any) => {
        this.dataLegal = resp;
      });
  }

  ngOnInit(): void {
    this.selectListService.getCustomersActive().subscribe((datos) => {
      this.dataCustomers = datos;
    });
  }

  sumar() {
    this.timeTotal =
      Number(this.timeMtto) +
      Number(this.timeOperacion) +
      Number(this.timeContabilidad) +
      Number(this.timeRRHH) +
      Number(this.timeLegal);
  }
}
