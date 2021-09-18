import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();

  constructor(private storeService: StorageService) {}

  //.... Obtener el valor del Token
  getToken(): any {
    return this.storeService.retireve('token');
  }

  // Remover los valores del storaSession
  resetAuthData() {
    this.storeService.remove('token');
  }

  // Se asigna los valores a las claves en el storaSession
  setAuthData(token: any) {
    this.storeService.store('token', token.token);
  }

  logOff() {
    this.resetAuthData();
  }
}
