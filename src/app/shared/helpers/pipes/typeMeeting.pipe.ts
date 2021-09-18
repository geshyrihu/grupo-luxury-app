import { Pipe, PipeTransform } from '@angular/core';
import { ETypeMeeting } from '../../enums/ETypeMeeting';

@Pipe({
  name: 'eeTypeMeeting',
})
export class ETypeMeetingPipe implements PipeTransform {
  enum: any[] = ETypeMeeting.GetEnum();
  transform(value: unknown): string {
    var dato: string = '';
    if (value === null) {
      dato = '';
    } else {
      this.enum.forEach((item) => {
        if (value === item.value) {
          dato = item.label;
        }
      });
    }
    return dato;
  }
}
