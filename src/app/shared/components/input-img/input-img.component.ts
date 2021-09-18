import { Component, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { toBase64 } from '../../helpers/utilities';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
})
export class InputImgComponent {
  imgBase64: string;

  //Ruta de Imagen por defecto
  noImg = `${environment.base_urlImg}no-img.png`;

  //Ingresamos la imgan actual
  @Input()
  urlImgCurrent: string = '';

  @Input()
  title: string = '';

  @Input()
  contentHeight: 150;
  @Input()
  contentWidth: 250;

  @Output()
  fileSelected: EventEmitter<File> = new EventEmitter<File>();

  change(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file)
        .then((value: string) => {
          this.imgBase64 = value;
        })
        .catch((error) => console.log(error));
      this.fileSelected.emit(file);
    }
  }
}
