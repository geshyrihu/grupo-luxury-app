import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../../shared/services/auth.service';
import { MedidorCategoriaDto } from '../../interface/medidor-categoria';
@Component({
  selector: 'app-form-medidor-categoria',
  templateUrl: './form-medidor-categoria.component.html',
})
export class FormMedidorCategoriaComponent implements OnInit {
  id: number = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    nombreMedidorCategoria: ['', Validators.required],
    applicationUserId: [this.authService.InfoUserAuthDto.id],
  });
  get nombreMedidorCategoria() {
    return this.form.get('nombreMedidorCategoria');
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce
      .get<MedidorCategoriaDto>(`MedidorCategoria/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post(`MedidorCategoria`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(`MedidorCategoria/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
