import { AuthService } from './auth.service';
import { PanelDto } from '../../models/operationReport/panelDto';
import { Injectable } from '@angular/core';
import { formDateToString } from '../helpers/utilities';
const date = new Date();
@Injectable({
  providedIn: 'root',
})
export class FilterReportOperationService {
  panelDto = new PanelDto();

  constructor(private authService: AuthService) {
    this.panelDto.customer = this.authService.customerAuthId;
    this.panelDto.status = null;
    this.panelDto.responsible = '';
    this.panelDto.request = '';
    this.panelDto.requestStart = '';
    this.panelDto.finishedStart = '';
    this.panelDto.requestEnd = '';
    this.panelDto.finishedEnd = '';
    this.panelDto.priority = '';
    this.panelDto.folioReporte = null;
  }
  setIdCustomer(idCustomer: number) {
    this.panelDto.customer = idCustomer;
  }
  getIdCustomer() {
    return this.panelDto.customer;
  }
  getPanelDto() {
    return this.panelDto;
  }
  setPanelDto(panelDto: any) {
    this.panelDto = panelDto;
  }
}
