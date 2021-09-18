import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { EProductClasificacion } from 'src/app/shared/enums/EProductClasificacion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
})
export class CrudProductosComponent implements OnInit {
  id: any = 0;
  urlBaseImg = '';
  model: any;
  photoFileUpdate: boolean = false;
  userId = '';
  form: FormGroup;
  cb_category: any[] = [];
  cb_clasificacion = EProductClasificacion.GetEnum();

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private authservice: AuthService,
    private dataService: DataService,
    private selectListServide: SelectlistService
  ) {
    this.userId = this.authservice.InfoUserAuthDto.id;

    this.selectListServide.getCategories().subscribe((resp) => {
      this.cb_category = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      nombreProducto: ['', Validators.required],
      categoryId: ['', Validators.required],
      urlImagen: [''],
      marca: [''],
      modelo: [''],
      clasificacion: [0],
      applicationUserId: [this.userId],
    });
  }

  get nombreProducto() {
    return this.form.get('nombreProducto');
  }
  get categoryId() {
    return this.form.get('categoryId');
  }

  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ urlImagen: file });
  }

  onLoadData() {
    this.dataService.get(`Productos/${this.id}`).subscribe((resp: any) => {
      this.urlBaseImg = `${environment.base_urlImg}Administration/products/${resp.body.urlImagen}`;
      this.form.patchValue(resp.body);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const formData = this.createFormData(this.form.value);

    if (this.id === 0) {
      this.dataService.post('Productos', formData).subscribe(
        (resp) => {
          this.ref.close('Producto creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService.put(`Productos/${this.id}`, formData).subscribe(
        (resp) => {
          this.ref.close('Datos del producto actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }

  private createFormData(dto: any): FormData {
    if (dto.marca == null || dto.marca == 'null') {
      dto.marca = '';
    }
    if (dto.modelo == null || dto.modelo == 'null') {
      dto.modelo = '';
    }
    const formData = new FormData();
    formData.append('nombreProducto', dto.nombreProducto);
    formData.append('categoryId', String(dto.categoryId));
    formData.append('marca', dto.marca);
    formData.append('modelo', dto.modelo);
    formData.append('clasificacion', String(dto.clasificacion));
    formData.append('applicationUserId', dto.applicationUserId);

    // ... Si hay un archivo cargado agrega la prop photoPath con su valor
    if (dto.urlImagen) {
      formData.append('urlImagen', dto.urlImagen);
    }

    return formData;
  }
}
