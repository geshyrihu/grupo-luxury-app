import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CedulaPresupuestalDetalleAddOrEdit } from './interface';

@Component({
  selector: 'app-addoredit',
  templateUrl: './edit.component.html',
  providers: [DialogService, MessageService],
})
export class EditBudgetCardDetailsComponent implements OnInit {
  userId: string = '';
  id: any = 0;
  form: FormGroup;
  chartOfAccount: string;
  descripcion: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.userId = authService.InfoUserAuthDto.id;
  }

  ngOnInit() {
    this.id = this.config.data.id;
    this.loadItem();
  }

  onSubmit() {
    const budgetCardDTO: CedulaPresupuestalDetalleAddOrEdit = this.form.value;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      if (this.id === 0) {
        this.dataService
          .post(`CedulaPresupuestalDetalles`, budgetCardDTO)
          .subscribe(
            (resp) => {
              this.ref.close('Registro creado');
            },
            (err) => {
              console.log(err.error);
            }
          );
      } else {
        this.dataService
          .put(`CedulaPresupuestalDetalles/${this.id}`, budgetCardDTO)
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
    this.form = this.formBuilder.group({
      id: [this.id],
      cuentaId: [0],
      cedulaPresupuestalId: [''],
      presupuestoMensual: [0, Validators.required],
      applicationUserId: [''],
      presupuestoEjercido: [],
    });
    this.dataService
      .get(`CedulaPresupuestalDetalles/${this.id}`)
      .subscribe((resp: any) => {
        this.descripcion = resp.body.cuenta.descripcion;
        this.form.patchValue(resp.body);
      });
  }
}
