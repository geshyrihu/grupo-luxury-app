import { ResponsibleAreaDto } from 'src/app/pages/comunes/responsible-areas/interfaces/ResponsibleAreaDto';
import { EStatus } from 'src/app/shared/enums/EStatus';

export interface MettingetailsDto {
  id: number;
  responsibleAreaId: number;
  responsibleArea: ResponsibleAreaDto;
  status: EStatus | null;
  deliveryDate: string;
  advance: number;
  title: string;
  requestService: string;
  observations: string;
  meetingId: number;
}
