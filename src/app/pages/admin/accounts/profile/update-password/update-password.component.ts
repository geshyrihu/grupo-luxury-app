import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ECloseModal } from 'src/app/shared/enums/ECloseModal';
import { passwordValidation } from 'src/app/shared/helpers/directives/validations/password-validation.directive';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ChangePasswordDto } from '../../../../../interfaces/accounts/profile/ChangePasswordDto';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit {
  passwordFailed: boolean = false;
  errores: string[] = [];

  enviando: boolean = false;
  labelButton: string = 'Guardar';

  formUpdatePassword = this.formBuilder.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: [
        '',
        {
          validators: [Validators.required, passwordValidation()],
        },
      ],
      confirm: ['', Validators.required],
    },
    {
      validators: this.passwordEqual('newPassword', 'confirm'),
    }
  );
  get currentPassword() {
    return this.formUpdatePassword.get('currentPassword');
  }
  get newPassword() {
    return this.formUpdatePassword.get('newPassword');
  }
  get confirm() {
    return this.formUpdatePassword.get('confirm');
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {}

  updatePassword() {
    if (this.formUpdatePassword.invalid) {
      Object.values(this.formUpdatePassword.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    this.enviando = true;
    this.labelButton = 'Enviando...';

    const model: ChangePasswordDto = this.formUpdatePassword.value;

    const id = this.authService.InfoUserAuthDto.id;
    this.dataService.put(`Users/ChangePassword/${id}`, model).subscribe(
      (resp) => {
        this.enviando = false;
        this.labelButton = 'Enviando...';
        this.ref.close(ECloseModal.Success);
      },
      (err) => {
        console.log(err.error);
        this.enviando = false;
        this.labelButton = 'Guardar';
        this.passwordFailed = true;
      }
    );
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
    const pass1 = this.formUpdatePassword.get('newPassword').value;
    const pass2 = this.formUpdatePassword.get('confirm').value;

    if (pass1 !== pass2 && this.updatePassword) {
      return true;
    } else {
      return false;
    }
  }
}
