import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditChartOfAccountComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.userId = authService.InfoUserAuthDto.id;
  }
  userId: string = '';
  id: any = 0;
  form: FormGroup;

  get numeroCuenta() {
    return this.form.get('numeroCuenta');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get codigoSat() {
    return this.form.get('codigoSat');
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.loadItem();
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      numeroCuenta: ['', Validators.required],
      descripcion: ['', Validators.required],
      codigoSat: ['', Validators.required],
      applicationUserId: [this.userId],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService.post(`Cuentas/`, this.form.value).subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
      } else {
        this.dataService.put(`Cuentas/${this.id}`, this.form.value).subscribe(
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
  loadItem() {
    this.dataService.get(`Cuentas/${this.id}`).subscribe((resp) => {
      this.form.patchValue(resp.body);
    });
  }
}
