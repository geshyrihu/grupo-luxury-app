import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Directive({
  selector: '[usernameUnico]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameUnicoDirective,
      multi: true,
    },
  ],
})
export class UsernameUnicoDirective implements AsyncValidator {
  constructor(private dataService: DataService) {}

  validate(
    control: import('@angular/forms').AbstractControl
  ):
    | Promise<import('@angular/forms').ValidationErrors>
    | import('rxjs').Observable<import('@angular/forms').ValidationErrors> {
    const username = control.value;
    return this.dataService.get(`Auth/ValidateUser/${username}`).pipe(
      map((usernameArr: any) => {
        if (usernameArr.body == null) {
          return null;
        }
        if (usernameArr.body.userName === username) {
          return { usernameUnico: true };
        }
        return null;
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class UsernameUnicoService implements AsyncValidator {
  constructor(private dataService: DataService) {}

  validate(
    control: import('@angular/forms').AbstractControl
  ):
    | Promise<import('@angular/forms').ValidationErrors>
    | import('rxjs').Observable<import('@angular/forms').ValidationErrors> {
    const usernameUnicoDirective = new UsernameUnicoDirective(this.dataService);
    return usernameUnicoDirective.validate(control);
  }
}
