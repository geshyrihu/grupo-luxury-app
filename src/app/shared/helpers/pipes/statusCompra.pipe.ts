import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eStatusCompra',
})
export class EStatusCompraPipe implements PipeTransform {
  enum: any[] = EStatusCompra.GetEnum();
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

export class EStatusCompra {
  public static GetEnum() {
    const data = [
      { value: 0, label: 'Autorizado' },
      { value: 1, label: 'No Autorizado' },
      { value: 2, label: 'Pendiente' },
    ];
    return data;
  }
}
