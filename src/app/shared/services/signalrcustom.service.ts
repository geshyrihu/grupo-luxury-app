import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from './../../../environments/environment';
const url = environment.base_signalr;
@Injectable({
  providedIn: 'root',
})
export class SignalrcustomService {
  public hubConnection: HubConnection;
  constructor() {
    console.log('SignalrcustomService iniciado!!!');

    let builder = new HubConnectionBuilder();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${url}cnn`)
      .build();

    this.hubConnection.on('enviartodos', (respuesta) => {
      console.log('respuesta: ', respuesta);
    });

    // console.log('connection: ', connection);
    // connection.on('enviartodos', (data) => {
    //   console.log('resp enviartodos', data);
    // });
    this.hubConnection.start();
  }
}
