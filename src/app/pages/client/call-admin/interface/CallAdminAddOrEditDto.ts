import { ERequest } from 'src/app/shared/enums/ERequest';
import { EStatus } from 'src/app/shared/enums/EStatus';

export interface CallAdminAddOrEditDto {
  dateRequest: string;
  timeRequest: string;
  directoryCondominiumId: number;
  requestService: string;
  request: ERequest | null;
  responsibleAreaId: number;
  employeeId: number;
  status: EStatus | null;
  observations: string;
  customerId: number;
}
