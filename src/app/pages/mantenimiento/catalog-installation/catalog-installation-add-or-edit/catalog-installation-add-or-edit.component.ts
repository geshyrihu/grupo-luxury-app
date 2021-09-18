import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-catalog-installation-add-or-edit',
  templateUrl: './catalog-installation-add-or-edit.component.html',
})
export class CatalogInstallationAddOrEditComponent implements OnInit {
  id: number = 0;

  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    nameInstallation: ['', Validators.required],
  });
  get nameInstallation() {
    return this.form.get('nameInstallation');
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce
      .get(`CatalogInstallation/${this.id}`)
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
      this.dataSerivce.post(`CatalogInstallation`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce
        .put(`CatalogInstallation/${this.id}`, this.form.value)
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
