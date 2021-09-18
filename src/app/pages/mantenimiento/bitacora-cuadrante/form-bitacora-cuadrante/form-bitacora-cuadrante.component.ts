import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-form-bitacora-cuadrante',
  templateUrl: './form-bitacora-cuadrante.component.html',
})
export class FormBitacoraCuadranteComponent implements OnInit {
  cb_equipos: any[] = [];
  id: number = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    customerId: [this.authService.customerAuthId],
    nombreCuadrante: ['', [Validators.required]],
    applicationUserId: [this.authService.InfoUserAuthDto.id],
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService,
    private authService: AuthService
  ) {}
  get nombreCuadrante() {
    return this.form.get('nombreCuadrante');
  }
  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.loadData();
    }
  }
  loadData() {
    this.dataSerivce.get(`BitacoraCuadrantes/${this.id}`).subscribe(
      (resp: any) => {
        this.form.patchValue(resp.body);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce.post(`BitacoraCuadrantes`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(`BitacoraCuadrantes/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
