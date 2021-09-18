import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { categoryAddOrEditDto, categoryDto } from '../interfaces/category';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
})
export class FormCategorieComponent implements OnInit {
  isInRole: boolean;
  id: any = 0;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    nameCotegory: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      },
    ],
    user: '',
  });
  get nameCotegory() {
    return this.form.get('nameCotegory');
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
    this.dataService
      .get<categoryDto>(`Categories/${this.id}`)
      .subscribe((resp) => {
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
      this.dataService
        .post<categoryAddOrEditDto>(`Categories/`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Categoria Creada');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataService
        .put<categoryAddOrEditDto>(`Categories/${this.id}`, this.form.value)
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
