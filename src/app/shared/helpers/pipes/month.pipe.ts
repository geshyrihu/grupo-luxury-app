import { Pipe, PipeTransform } from '@angular/core';
import { EMonth } from '../../enums/EMonth';

@Pipe({
  name: 'eMonth',
})
export class EMonthPipe implements PipeTransform {
  enum: any[] = EMonth.GetEnum();
  transform(value: number): string {
    var dato: string = '';
    if (value === null) {
      dato = '';
    } else {
      value = Number(value);

      this.enum.forEach((item) => {
        if (value === item.value) {
          dato = item.label;
        }
      });
    }
    return dato;
  }
}
