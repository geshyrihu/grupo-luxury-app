import { Pipe, PipeTransform } from '@angular/core';
import { ERelationEmployee } from '../../enums/ERelationEmployee';

@Pipe({
  name: 'eRelationEmployee',
})
export class ERelationEmployeePipe implements PipeTransform {
  enum: any[] = ERelationEmployee.GetEnum();
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
