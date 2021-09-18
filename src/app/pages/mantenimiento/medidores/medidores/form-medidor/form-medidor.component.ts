import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../../shared/services/auth.service';
import { MedidorLecturaDto } from '../../interface/medidor-lectura';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
@Component({
  selector: 'app-form-medidor',
  templateUrl: './form-medidor.component.html',
})
export class FormMedidorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    private selectListService: SelectlistService
  ) {
    this.selectListService.getMedidorCategoria().subscribe((resp) => {
      this.cb_nombreMedidorCategoria = resp;
    });
  }

  id: number = 0;
  cb_nombreMedidorCategoria: any[] = [];
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    medidorActivo: [true],
    fechaRegistro: [''],
    consumoDiarioMaximo: [0, Validators.required],
    medidorCategoriaId: ['', Validators.required],
    numeroMedidor: ['', Validators.required],
    descripcion: ['', Validators.required],
    customerId: [this.authService.customerAuthId],
    applicationUserId: [this.authService.InfoUserAuthDto.id],
  });
  get medidorCategoriaId() {
    return this.form.get('medidorCategoriaId');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get numeroMedidor() {
    return this.form.get('numeroMedidor');
  }
  get consumoDiarioMaximo() {
    return this.form.get('consumoDiarioMaximo');
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce
      .get<MedidorLecturaDto>(`Medidor/${this.id}`)
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
      this.dataSerivce.post(`Medidor`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce.put(`Medidor/${this.id}`, this.form.value).subscribe(
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
