import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-upload-img',
  templateUrl: './form-upload-img.component.html',
})
export class FormUploadImgComponent implements OnInit, OnDestroy {
  uploadedFiles: any[] = [];
  idOrdenServicio = 0;
  maxFileSize = 0;
  url = environment.base_url + 'OrdenServicios/SubirImg/';
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.idOrdenServicio = this.config.data.id;
  }
  ngOnDestroy(): void {
    this.ref.close('Actualizado');
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  ngOnInit(): void {
    this.url = this.url + this.idOrdenServicio;
  }
}
