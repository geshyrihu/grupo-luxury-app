import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ECloseModal } from 'src/app/shared/enums/ECloseModal';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';

const baseUrlImg = environment.base_urlImg;

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
})
export class UpdateAvatarComponent implements OnInit {
  private id: string = '';
  photoPath: string = '';
  public imgUpload: any;
  public imgTemp: any;
  imgName: any = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public ref: DynamicDialogRef
  ) {
    this.id = authService.InfoUserAuthDto.id;
    this.photoPath = authService.InfoUserAuthDto.photoPath;
  }

  ngOnInit(): void {}

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
          this.authService.InfoUserAuthDto.photoPath = `${baseUrlImg}Administration/accounts/${resp.body['pathFile']}`;
          this.ref.close(ECloseModal.Success);
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
