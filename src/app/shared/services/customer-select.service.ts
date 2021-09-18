import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerSelectService {
  customerId: number = 0;
  private customerId$ = new Subject<number>();

  constructor(private authService: AuthService) {
    this.customerId = this.authService.customerAuthId;
  }

  setCustomerId(customerId: number) {
    this.customerId = customerId;
    this.customerId$.next(customerId);
  }

  getCustomerId$(): Observable<number> {
    return this.customerId$.asObservable();
  }
}
