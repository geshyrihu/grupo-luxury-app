import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { InfoUserAuthDto } from 'src/app/models/auth/InfoUserAuthDto';
import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { passwordValidation } from 'src/app/shared/helpers/directives/validations/password-validation.directive';

const baseUrlImg = environment.base_urlImg;
@Component({
  selector: 'app-editprofile',
  templateUrl: './update-profile.component.html',
  providers: [MessageService],
})
export class ProfileComponent {
  //Propiedades
  private id: string = '';
  public formUpdateProfile: FormGroup;
  public infoUserAuthDto: InfoUserAuthDto;
  errorMessage: string;

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
  ) {
    this.infoUserAuthDto = authService.InfoUserAuthDto;
  }

  ngOnInit(): void {
    this.id = this.authService.InfoUserAuthDto.id;
    this.formUpdateProfile = this.formBuilder.group({
      email: [
        this.infoUserAuthDto.email,
        [Validators.required, Validators.email],
      ],
      firstName: [this.infoUserAuthDto.firstName, Validators.required],
      lastName: [this.infoUserAuthDto.lastName, Validators.required],
      birth: [this.infoUserAuthDto.birth, [Validators.required]],
      phoneNumber: [this.infoUserAuthDto.phoneNumber, Validators.required],
    });
  }
  updateProfile() {
    if (this.formUpdateProfile.invalid) {
      Object.values(this.formUpdateProfile.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    const { email, phoneNumber, firstName, lastName, birth } =
      this.formUpdateProfile.value;
    (this.infoUserAuthDto.email = email),
      (this.infoUserAuthDto.phoneNumber = phoneNumber),
      (this.infoUserAuthDto.firstName = firstName),
      (this.infoUserAuthDto.lastName = lastName),
      (this.infoUserAuthDto.birth = birth),
      this.dataService
        .put('Users/UpdateDataUser/' + this.id, this.infoUserAuthDto)
        .subscribe(
          (resp) => {
            this.ref.close('Datos actualizados');
          },
          (err) => {
            this.ref.close('Error al actualizar');

            console.log(err.error);
          }
        );
  }

  updatePassword() {
    if (this.formUpdatePassword.invalid) {
      Object.values(this.formUpdatePassword.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    const model: ChangePassword = {
      currentPassword: this.formUpdatePassword.get('currentPassword').value,
      newPassword: this.formUpdatePassword.get('newPassword').value,
    };
    const id = this.authService.InfoUserAuthDto.id;
    this.dataService.put(`Users/ChangePassword/${id}`, model).subscribe(
      (resp) => {
        this.ref.close('Contraseña actualizada');
      },
      (err) => {
        this.errorMessage = 'Contraseña incorrecta';
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
      }
    );
  }

  itemInvalid(item: string): boolean {
    return (
      this.formUpdateProfile.get(item).invalid &&
      this.formUpdateProfile.get(item).touched
    );
  }

  itemValid(item: string): boolean {
    return (
      this.formUpdateProfile.get(item).valid &&
      this.formUpdateProfile.get(item).touched
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
  // Cambio de imagen
  public imgUpload: any;
  public imgTemp: any;
  imgName: any = '';

  changeImg(file: File) {
    this.imgUpload = file;
    if (!file) {
      this.imgName = '';
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.imgName = file;
    };
  }
  uploadImg() {
    const formData = new FormData();
    formData.append('file', this.imgUpload);
    this.dataService.put('Users/updateImg/' + this.id, formData).subscribe(
      (resp) => {
        if (resp.body['pathFile']) {
          this.infoUserAuthDto.photoPath = `${baseUrlImg}Administration/accounts/${resp.body['pathFile']}`;
          this.ref.close('Fotografia actualizada');
        } else {
          return false;
        }
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
class ChangePassword {
  currentPassword: string;
  newPassword: string;
}
