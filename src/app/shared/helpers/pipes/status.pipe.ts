import { Pipe, PipeTransform } from '@angular/core';
import { EStatus } from '../../enums/EStatus';

@Pipe({
  name: 'eStatus',
})
export class EStatusPipe implements PipeTransform {
  enum: any[] = EStatus.GetEnum();
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
