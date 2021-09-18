import { Injectable } from '@angular/core';
const dateNow = new Date();
@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getDateNow30() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dayS: any = day;
    let monthS: any = month;
    if (month < 10) {
      monthS = `0${month}`;
    }
    if (day < 10) {
      dayS = `0${day}`;
    }
    return `${year}-${monthS}-${dayS}`;
  }
  getDateNow() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayS: any = day;
    let monthS: any = month;
    if (month < 10) {
      monthS = `0${month}`;
    }
    if (day < 10) {
      dayS = `0${day}`;
    }
    return `${year}-${monthS}-${dayS}`;
  }

  getDateFormat(value: Date) {
    if (value === null) {
      return null;
    } else {
      var date = new Date(value);
      var dateFinal = date.toISOString().slice(0, 10);
      return dateFinal;
    }
  }
  getHoraNow(date: Date) {
    let hora = date.getHours();
    let minutos = date.getMinutes();

    let horaReturn;
    let minutoreturn;
    if (hora < 10) {
      horaReturn = `0${hora}`;
    } else {
      horaReturn = hora;
    }
    if (minutos < 10) {
      minutoreturn = `0${minutos}`;
    } else {
      minutoreturn = minutos;
    }

    return `${horaReturn}:${minutoreturn}`;
  }
  getDateString(date: string) {
    let newDate = new Date(date);
    return this.getHoraNow(newDate);
  }
  getFullYear() {
    return dateNow.getFullYear();
  }
}
