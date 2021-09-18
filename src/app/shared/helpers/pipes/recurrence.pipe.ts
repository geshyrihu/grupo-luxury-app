import { Pipe, PipeTransform } from '@angular/core';
import { ERecurrence } from '../../enums/ERecurrence';

@Pipe({
  name: 'eRecurrence',
})
export class ERecurrencePipe implements PipeTransform {
  enum: any[] = ERecurrence.GetEnum();
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
