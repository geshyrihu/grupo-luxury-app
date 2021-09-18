import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-evaluacion-add-or-edit',
  templateUrl: './evaluacion-add-or-edit.component.html',
})
export class EvaluacionAddOrEditComponent implements OnInit {
  cb_empleado: any[] = [];
  resultadosEmpleado: any[] = [];
  empleado: any;

  cb_cuestionario: any[] = [];
  resultadosCuestionario: any[] = [];
  cuestionario: any;
  constructor(
    private dataService: DataService,
    private routerService: Router,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.dataService
      .get(
        'Cuestionarios/CuestionarioTemp/' +
          this.empleado.value +
          '/' +
          this.cuestionario.value
      )
      .subscribe(
        (resp) => {
          this.routerService.navigateByUrl('/rrhh/mis-evaluaciones');
          this.ref.close();
          console.log(resp.body);
        },
        (err) => {
          console.log(err.eror);
        }
      );
  }

  buscarEmpleados(event) {
    // this.resultadosEmpleado = [];
    this.dataService
      .get('Employees/GetEmployeeSelectItem/' + event.query)
      .subscribe(
        (resp: any) => {
          this.resultadosEmpleado = resp.body;
        },
        (err) => {
          err.error;
        }
      );
  }
  buscarCuestionario(event) {
    this.dataService
      .get('Cuestionarios/GetCuestionarioSelectItem/' + event.query)
      .subscribe(
        (resp: any) => {
          this.resultadosCuestionario = resp.body;
        },
        (err) => {
          err.error;
        }
      );
  }
}
