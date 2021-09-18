import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-empleados-edit',
  templateUrl: './empleados-edit.component.html',
})
export class EmpleadosEditComponent implements OnInit {
  id: number = 0;

  customerSelectItem: any;
  professionSelectItem: any;
  model: any;
  form = this.formBuilder.group({
    id: { value: this.id, disabled: true },
    customerId: ['', Validators.required],
    professionId: ['', [Validators.required]],
    active: ['', Validators.required],
  });
  get customerId() {
    return this.form.get('customerId');
  }
  get professionId() {
    return this.form.get('professionId');
  }
  get active() {
    return this.form.get('active');
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private selectListService: SelectlistService
  ) {
    this.selectListService.getCustomersActive().subscribe((resp) => {
      this.customerSelectItem = resp;
    });
    this.selectListService.getProfessions().subscribe((resp) => {
      this.professionSelectItem = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }
  onLoadData() {
    this.dataSerivce.get<any>(`Employees/${this.id}`).subscribe((resp: any) => {
      this.form.patchValue(resp.body);
      this.model = resp.body;
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.id = this.config.data.id;

    this.dataSerivce
      .put(`Employees/EmployeeAdminEditDto/${this.id}`, this.form.value)
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
