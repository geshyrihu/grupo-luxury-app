import { Pipe, PipeTransform } from '@angular/core';
import { EPriority } from '../../enums/EPriority';

@Pipe({
  name: 'ePriority',
})
export class EPriorityPipe implements PipeTransform {
  enum: any[] = EPriority.GetEnum();
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
