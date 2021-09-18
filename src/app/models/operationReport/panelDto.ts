import { EPriority } from '../../shared/enums/EPriority';
import { EStatus } from 'src/app/shared/enums/EStatus';
export class PanelDto {
  customer: any;
  status: any;
  responsible: any;
  request: any;
  requestStart: any;
  finishedStart: any;
  requestEnd: any;
  finishedEnd: any;
  priority: any;
  folioReporte: boolean;
}
export interface IPanelDto {
  customer: number;
  status: EStatus;
  responsible: number;
  request: number;
  requestStart: Date;
  finishedStart: Date;
  requestEnd: Date;
  finishedEnd: Date;
  priority: EPriority;
  folioReporte: boolean;
}
