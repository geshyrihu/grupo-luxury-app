import { EStatus } from 'src/app/shared/enums/EStatus';

export interface MeetingDetailAddOrEdit {
  responsibleAreaId: number;
  responsibleArea: any;
  status: EStatus;
  deliveryDate: Date;
  advance: number;
  title: string;
  requestService: string;
  observations: string;
  meetingId: number;
}
