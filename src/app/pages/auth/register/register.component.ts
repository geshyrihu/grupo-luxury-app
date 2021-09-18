import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';
import { UserInfoDto } from '../../../models/auth/UserInfoDto';
import Swal from 'sweetalert2';
import { passwordValidation } from 'src/app/shared/helpers/directives/validations/password-validation.directive';
import { UsernameUnicoService } from 'src/app/shared/helpers/directives/validations/username-unico.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  dataError = '';
  data: UserInfoDto = new UserInfoDto();
  formSubmitted = false;
  form = this.formBuilder.group(
    {
      email: [
        '',
        {
          validators: [
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
            Validators.required,
          ],
          asyncValidators: [
            this.usernameUnicoService.validate.bind(this.usernameUnicoService),
          ],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, passwordValidation()],
        },
      ],
      passwordConfirm: ['', Validators.required],
    },
    {
      validators: this.passwordEqual('password', 'passwordConfirm'),
    }
  );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private securityService: SecurityService,
    private usernameUnicoService: UsernameUnicoService
  ) {}

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get getpasswordNotValid() {
    return this.form.get('passwordNotValid');
  }
  register() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    const user: UserInfoDto = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.dataService.post('Auth/Create', user).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
        this.securityService.setAuthData(resp.body);
        Swal.close();
      },
      (err) => {
        console.log(err.error);
        err.error.forEach((x) => {
          this.dataError = this.dataError + x['description'] + ' ';
        });
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error',
          text: this.dataError,
        });
      }
    );
  }

  itemInvalid(item: string): boolean {
    return this.form.get(item).invalid && this.form.get(item).touched;
  }

  itemValid(item: string): boolean {
    return this.form.get(item).valid && this.form.get(item).touched;
  }
  passwordEqual(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notIsEqual: true });
      }
    };
  }
  passwordNotValid() {
    const pass1 = this.form.get('password').value;
    const pass2 = this.form.get('passwordConfirm').value;

    if (pass1 !== pass2 && this.register) {
      return true;
    } else {
      return false;
    }
  }
}
