import { PanelDto } from '../../models/operationReport/panelDto';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  data: any[] = [];
  customerId: number;
  operationReportfFilter: PanelDto;
  minutaId: number = 0;

  dataReport: any[] = [];
  constructor(private dataService: DataService) {}

  getReportCallAdmin() {
    return this.data;
  }
  setReportCallAdmin(dato: any) {
    this.data = dato;
  }
  getCustomerId() {
    return this.customerId;
  }
  setCustomerId(id: number) {
    this.customerId = id;
  }
  getDataOperationReport() {
    return this.operationReportfFilter;
  }
  setDataOperationReport(model: PanelDto) {
    this.operationReportfFilter = model;
  }

  setIdMinuta(id: number) {
    this.minutaId = id;
  }
  getIdMinuta() {
    return this.minutaId;
  }

  // onPushData(resp: any) {
  //   this.dataReport = [];
  //   resp.forEach((resp) => {
  //     if (resp.key === 'Mantenimiento') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Limpieza') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Jardinería') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Administración') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Constructora') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Seguridad interna') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Seguridade xterna') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Ludoteca') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Mensajería') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Palapa') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Externo') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Bellboy') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Sistemas') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Spa') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Contabilidad') {
  //       this.dataReport.push(resp);
  //     }
  //     if (resp.key === 'Juridico') {
  //       this.dataReport.push(resp);
  //     }
  //   });
  //   return this.dataReport;
  // }
}
