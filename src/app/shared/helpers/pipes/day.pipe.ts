import { Pipe, PipeTransform } from '@angular/core';
import { EDay } from '../../enums/EDay';

@Pipe({
  name: 'eDay',
})
export class EDayPipe implements PipeTransform {
  enum: any[] = EDay.GetEnum();
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
