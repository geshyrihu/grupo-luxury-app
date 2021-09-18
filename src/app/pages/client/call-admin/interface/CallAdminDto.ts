import { ERequest } from 'src/app/shared/enums/ERequest';
import { EStatus } from 'src/app/shared/enums/EStatus';

export interface CallAdminDto {
  id: number;
  dateRequest: string;
  timeRequest: string;
  directoryCondominiumId: number;
  directoryCondominium: string;
  requestService: string;
  request: ERequest | null;
  responsibleAreaId: number;
  responsibleArea: string;
  employeeId: number;
  employee: string;
  status: EStatus | null;
  observations: string;
  customerId: number;
}
