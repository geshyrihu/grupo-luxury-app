import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RecoveryPassword } from 'src/app/models/auth/recoveryPasswordDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
})
export class RecoverypasswordComponent {
  public data: RecoveryPassword = new RecoveryPassword();
  public formSubmitted = false;
  public form = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.required,
      ],
    ],
  });
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.form.get('email');
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
      };
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      });
      Swal.showLoading();
      this.dataService.post('Auth/RecoverPassword', this.data).subscribe(
        (resp) => {
          Swal.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Intrucciones enviadas, revisa tu correo',
            showConfirmButton: false,
          });
        },
        (err) => {
          console.log(err.error);
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error',
            text: err.error[''],
          });
        }
      );
    }
  }
}
