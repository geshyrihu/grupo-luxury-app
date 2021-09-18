import { EMonth } from '../enums/EMonth';

export function toBase64(file: File) {
  return new Promise((resolve, rejects) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => rejects(err);
  });
}

export function formDateToStringLocale(date: Date) {
  if (date === null) {
    return null;
  } else {
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const [{ value: month }, , { value: day }, , { value: year }] =
      format.formatToParts(date);

    return `${day}-${month}-${year}`;
  }
}

export function formDateToString(date: Date) {
  if (date === null) {
    return null;
  } else {
    var date2 = new Date(date);
    var dateFinal = date2.toISOString().slice(0, 10);
    return dateFinal;
  }
}

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.error) {
    if (typeof response.error === 'string') {
      resultado.push(response.error);
    } else {
      const mapaErrores = response.error.errors;
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0];
        arreglo[1].forEach((mensajeError) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }

  return resultado;
}

export function nombreMes(value: number) {
  var dato: string = '';
  if (value === null) {
    dato = '';
  } else {
    value = Number(value);

    EMonth.GetEnum().forEach((item) => {
      if (value === item.value) {
        dato = item.label;
      }
    });
  }
  return dato;
}
