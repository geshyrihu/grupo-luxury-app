import { ETypeMeeting } from 'src/app/shared/enums/ETypeMeeting';

export interface MeetingIndextDto {
  id: number;
  customerId: number;
  date: string;
  eTypeMeeting: ETypeMeeting | null;
  issues: number;
  pending: number;
}
