import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { map } from 'rxjs/operators';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CedulaPresupuestalDetalleAddOrEdit } from './interface';

@Component({
  selector: 'app-addoredit',
  templateUrl: './add.component.html',
})
export class AddBudgetCardDetailsComponent implements OnInit {
  data: any[] = [];
  cedulaPresupuestalId;
  userId: string = '';
  constructor(
    private dataService: DataService,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.userId = this.authService.InfoUserAuthDto.id;
    this.cedulaPresupuestalId = this.config.data.idBudgetCard;
    this.onLoadData();
  }
  onLoadData() {
    this.dataService
      .get(
        `ComboBox/AddCuentaCedulaPresupuestal/${this.config.data.idBudgetCard}`
      )
      .subscribe(
        (resp: any) => {
          this.data = resp.body.map(function (cuenta: any) {
            return {
              id: cuenta.id,
              numeroCuenta: cuenta.numeroCuenta,
              descripcion: cuenta.descripcion,
              presupuestoMensual: 0,
            };
          });
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onSubmit(item: any) {
    var model: CedulaPresupuestalDetalleAddOrEdit = new CedulaPresupuestalDetalleAddOrEdit();

    model.cuentaId = item.id;
    model.cedulaPresupuestalId = this.cedulaPresupuestalId;
    model.presupuestoMensual = item.presupuestoMensual;
    model.applicationUserId = this.userId;
    model.presupuestoEjercido = 0;
    this.dataService.post(`CedulaPresupuestalDetalles`, model).subscribe(
      (resp) => {
        this.onLoadData();
        // this.ref.close('Registro creado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
