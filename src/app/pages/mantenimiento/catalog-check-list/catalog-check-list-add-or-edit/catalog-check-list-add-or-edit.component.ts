import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-catalog-check-list-add-or-edit',
  templateUrl: './catalog-check-list-add-or-edit.component.html',
})
export class CatalogCheckListAddOrEditComponent implements OnInit {
  id: number = 0;

  cb_category: any[] = [];
  category: SelectItem;
  categoryResult: any[] = [];

  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    categoryId: ['', Validators.required],
    description: ['', Validators.required],
  });
  get categoryId() {
    return this.form.get('categoryId');
  }
  get description() {
    return this.form.get('description');
  }

  constructor(
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.selectListService.getCategories().subscribe((resp) => {
      this.cb_category = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce
      .get(`CatalogCheckList/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
        this.category = {
          label: resp.body.category,
          value: resp.body.categoryId,
        };
      });
  }

  filtrarProveedor(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_category.length; i++) {
      let country = this.cb_category[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.categoryResult = filtered;
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;

    let categoria = {
      categoryId: this.category.value,
      description: this.form.get('description').value,
    };
    if (this.id === 0) {
      this.dataSerivce.post(`CatalogCheckList`, categoria).subscribe(
        (resp) => {
          this.ref.close('Registro creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataSerivce.put(`CatalogCheckList/${this.id}`, categoria).subscribe(
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
