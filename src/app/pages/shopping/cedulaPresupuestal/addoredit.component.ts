import { SelectlistService } from '../../../shared/services/selectlist.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
})
export class AddoreditBudgetCardComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private dateService: DateService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private selectListService: SelectlistService
  ) {
    this.userId = authService.InfoUserAuthDto.id;
    selectListService.getCustomersActive().subscribe((resp) => {
      this.cb_Customers = resp;
    });
  }
  userId: string = '';
  id: any = 0;
  form: FormGroup;
  cb_Customers: any[] = [];

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.loadItem();
    }

    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      anio: [this.dateService.getFullYear(), Validators.required],
      customerId: ['', Validators.required],
      applicationUserId: [this.userId],
    });
  }

  get anio() {
    return this.form.get('anio');
  }

  get customerId() {
    return this.form.get('customerId');
  }
  onSubmit() {
    const budgetCardDTO: any = this.form.value;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService.post(`CedulaPresupuestal`, budgetCardDTO).subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
      } else {
        this.dataService
          .put(`CedulaPresupuestal/${this.id}`, budgetCardDTO)
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
  loadItem() {
    this.dataService.get(`CedulaPresupuestal/${this.id}`).subscribe((resp) => {
      this.form.patchValue(resp.body);
    });
  }
}
