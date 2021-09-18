import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { professionDto } from '../interfaces/profession';

@Component({
  selector: 'app-form-professions',
  templateUrl: './form-professions.component.html',
})
export class FormProfessionsComponent implements OnInit {
  id: number = 0;
  isInRole: boolean;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    nameProfession: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  get nameProfession() {
    return this.form.get('nameProfession');
  }
  get description() {
    return this.form.get('description');
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
    this.dataService
      .get<professionDto>(`Professions/${id}`)
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
      // ...Creación de registro
      this.dataService.post(`Professions`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Profesión creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      // ...Actualización de registro
      this.dataService.put(`Professions/${this.id}`, this.form.value).subscribe(
        (resp) => {
          this.ref.close('Profesión actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }
}
