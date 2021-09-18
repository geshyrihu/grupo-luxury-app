import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MedidorLecturaDto } from '../../interface/medidor-lectura';
import { formDateToString } from 'src/app/shared/helpers/utilities';
const date = new Date();
@Component({
  selector: 'app-form-medidor-lectura',
  templateUrl: './form-medidor-lectura.component.html',
})
export class FormMedidorLecturaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {
    this.dateString = formDateToString(date);
  }
  dateString: string = '';
  dateStringUltimoRegistro: string = '';
  seRegistroEsteDia: boolean = false;
  seRegistroEsteDiaMensaje: string = 'Ya se cargo el registro de este día';
  id: number = 0;
  ultimaLectura: number = 0;
  medidorId: number = 0;
  cb_nombreMedidorCategoria: any[] = [];
  form: FormGroup;
  get lectura() {
    return this.form.get('lectura');
  }

  validarUltimaLectura() {
    if (this.dateString === this.dateStringUltimoRegistro) {
      this.seRegistroEsteDia = true;
    } else {
      this.seRegistroEsteDia = false;
    }
  }
  ngOnInit(): void {
    this.id = this.config.data.id;
    this.medidorId = this.config.data.medidorId;
    this.dataSerivce
      .get(`MedidorLectura/UltimaLectura/${this.medidorId}`)
      .subscribe(
        (resp: any) => {
          if (resp.body !== null) {
            this.dateStringUltimoRegistro = formDateToString(
              resp.body.fechaRegistro
            );
            this.validarUltimaLectura();
            this.ultimaLectura = resp.body.lectura;
          }
        },
        (err) => {
          console.log(err.error);
        }
      );
    if (this.id !== 0) {
      this.onLoadData();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      medidorId: [this.medidorId],
      fechaRegistro: [''],
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
  laLecturaEsMenor = false;
  evaluarLectura(event: any) {
    if (
      event.target.value < Number(this.ultimaLectura) &&
      this.ultimaLectura !== 0
    ) {
      this.laLecturaEsMenor = true;
    } else {
      this.laLecturaEsMenor = false;
    }
  }
}
