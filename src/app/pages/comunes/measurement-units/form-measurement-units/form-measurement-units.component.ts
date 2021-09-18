import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-form-measurement-units',
  templateUrl: './form-measurement-units.component.html',
})
export class FormMeasurementUnitsComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    descripcion: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    user: '',
  });
  get descripcion() {
    return this.form.get('descripcion');
  }
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.loadItem();
    }
  }

  loadItem() {
    this.dataService.get(`MeasurementUnits/${this.id}`).subscribe((resp) => {
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
      this.dataService.post(`MeasurementUnits/`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`MeasurementUnits/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Categoria Actualizada');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
