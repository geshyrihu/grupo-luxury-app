import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-addoredit-way-to-pay',
  templateUrl: './addoredit-way-to-pay.component.html',
})
export class AddoreditWayToPayComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadItem();
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      codigo: ['', [Validators.required]],
      descripcion: ['', Validators.required],
      applicationUserId: [this.authService.InfoUserAuthDto.id],
    });
  }
  get codigo() {
    return this.form.get('codigo');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }

  onLoadItem() {
    this.dataService.get<any>(`FormaPago/${this.id}`).subscribe((resp) => {
      this.form.patchValue(resp.body);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    if (this.id === 0) {
      this.dataService.post<any>(`FormaPago/`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put<any>(`FormaPago/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro Actualizado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
