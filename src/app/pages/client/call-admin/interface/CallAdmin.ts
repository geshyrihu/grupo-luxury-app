import { EStatus } from 'src/app/shared/enums/EStatus';

export class FilterCallAdminDto {
  dateStart: Date;
  dateEnd: Date;
}
export interface CallAdmin {
  dateRequest: Date;
  directoryCondominiumId: number;
  requestService: string;
  request: string;
  responsibleAreaId: number;
  employeeId: number;
  status: EStatus;
  observations: string;
}
