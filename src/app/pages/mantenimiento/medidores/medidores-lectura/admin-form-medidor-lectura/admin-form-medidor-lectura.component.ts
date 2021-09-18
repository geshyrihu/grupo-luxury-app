import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { MedidorLecturaDto } from '../../interface/medidor-lectura';
const date = new Date();
@Component({
  selector: 'app-admin-form-medidor-lectura',
  templateUrl: './admin-form-medidor-lectura.component.html',
})
export class AdminFormMedidorLecturaComponent implements OnInit {
  id: number = 0;
  ultimaLectura: number = 0;
  medidorId: number = 0;
  form: FormGroup;
  today: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.today = new Date().toISOString().slice(0, 16);
  }

  get lectura() {
    return this.form.get('lectura');
  }
  get fechaRegistro() {
    return this.form.get('fechaRegistro');
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    this.medidorId = this.config.data.medidorId;

    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      medidorId: [this.medidorId],
      fechaRegistro: [this.today, Validators.required],
      lectura: ['', Validators.required],
      applicationUserId: [this.authService.InfoUserAuthDto.id],
    });
  }
  onLoadData() {
    this.dataSerivce
      .get<MedidorLecturaDto>(`MedidorLectura/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
      });
  }
  onSubmit() {
    if (this.form.value.lectura == 0) {
      return;
    }
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post(`MedidorLectura`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(`MedidorLectura/${this.id}`, this.form.value)
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
