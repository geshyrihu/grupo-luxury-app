import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-form-responsible-areas',
  templateUrl: './form-responsible-areas.component.html',
})
export class FormResponsibleAreaComponent implements OnInit {
  id: number = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    position: [],
    nameArea: ['', [Validators.required, Validators.minLength(5)]],
  });

  get nameArea() {
    return this.form.get('nameArea');
  }
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData(this.id);
    }
  }

  onLoadData(id: number) {
    this.dataService.get(`ResponsibleAreas/${id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataService.post(`ResponsibleAreas`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Área responsable creada');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService
        .put(`ResponsibleAreas/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Área responsable actualizada');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }
}
