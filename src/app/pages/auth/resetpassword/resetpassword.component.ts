import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ResetPasswordDto } from '../../../models/auth/ResetPasswordDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
})
export class ResetpasswordComponent implements OnInit {
  public token: string;
  public data: ResetPasswordDto = new ResetPasswordDto();
  public form = this.formBuilder.group(
    {
      email: [
        '',
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          Validators.required,
        ],
      ],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    },
    {
      validators: this.passwordEqual('password', 'passwordConfirm'),
    }
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((resp) => {
      this.token = resp['token'];
    });

    const paramToken = this.activatedRoute.snapshot['queryParams'];
    this.token = paramToken.token;
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      this.data = {
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        token: this.token,
      };
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      });
      Swal.showLoading();
      this.dataService.post('Auth/ResetPassword', this.data).subscribe(
        (resp) => {
          this.router.navigateByUrl('#/auth/login');
          Swal.close();

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña reestablecida con exito!!!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          console.log(err.error);

          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: 'Error al intentar reestablecer la contraseña ',
          });
        }
      );
    }
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

    if (pass1 !== pass2 && this.submit) {
      return true;
    } else {
      return false;
    }
  }
}
