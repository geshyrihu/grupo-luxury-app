import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';
import { UserInfoDto } from 'src/app/models/auth/UserInfoDto';
import Swal from 'sweetalert2';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public userInfoDto: UserInfoDto = new UserInfoDto();
  public formSubmitted = false;
  public form = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.required,
      ],
    ],
    password: [, Validators.required],
    remember: [false],
  });
  userId: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private securityService: SecurityService,
    private authService: AuthService
  ) {
    if (this.authService.UserId !== undefined) {
      this.logout();
    }
    this.securityService.resetAuthData();
  }

  logout() {
    this.dataService
      .get('Auth/logout/' + this.authService.InfoUserAuthDto.id)
      .subscribe(
        (resp) => {},
        (err) => {
          console.log(err.error);
        }
      );
  }

  login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      this.userInfoDto = {
        email: this.form.get('email').value,
        password: this.form.get('password').value,
      };
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      });
      Swal.showLoading();
      this.dataService.post('Auth/login', this.userInfoDto).subscribe(
        (resp: any) => {
          if (this.form.get('remember').value) {
            localStorage.setItem('email', this.form.controls.email.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
          this.securityService.setAuthData(resp.body);
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bienvenido!!!!' + resp.body.infoUserAuthDto['firstName'],
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
            text: err.error['description'],
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
}
