import { Pipe, PipeTransform } from '@angular/core';
import { EHabitant } from '../../enums/EHabitant';

@Pipe({
  name: 'eHabitant',
})
export class HabitantPipe implements PipeTransform {
  enum: any[] = EHabitant.GetEnum();
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
