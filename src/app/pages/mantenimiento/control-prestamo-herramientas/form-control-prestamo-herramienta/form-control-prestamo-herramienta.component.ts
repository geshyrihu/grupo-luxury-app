import { AuthService } from '../../../../shared/services/auth.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-form-control-prestamo-herramienta',
  templateUrl: './form-control-prestamo-herramienta.component.html',
})
export class FormControlPrestamoHerramientaComponent implements OnInit {
  id: number = 0;
  cb_Employee: any[] = [];
  employee: SelectItem;
  employeeResult: any[] = [];
  cb_Tool: any[] = [];
  tool: SelectItem;
  toolResult: any[] = [];
  customerId: number = 0;
  today: string = '';

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataSerivce: DataService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public selectListService: SelectlistService,
    public authService: AuthService // public autocompleteService: AutocompleteService
  ) {
    this.customerId = this.authService.customerAuthId;
    selectListService.getEmployee().subscribe((resp) => {
      this.cb_Employee = resp;
    });
    selectListService.getTool(this.customerId).subscribe((resp) => {
      this.cb_Tool = resp;
    });
    this.today = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      customerId: [this.authService.customerAuthId],
      fechaSalida: [this.today, Validators.required],
      fechaRegreso: [],
      employeeId: ['', Validators.required],
      toolId: ['', Validators.required],
      observaciones: [],
      applicationUserId: [this.authService.InfoUserAuthDto.id],
    });
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
  }

  autocompleteTool(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_Tool.length; i++) {
      let country = this.cb_Tool[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.toolResult = filtered;
  }
  autocompleteEmployee(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cb_Employee.length; i++) {
      let country = this.cb_Employee[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.employeeResult = filtered;
  }
  onLoadData() {
    this.dataSerivce
      .get(`ControlPrestamoHerramientas/${this.id}`)
      .subscribe((resp: any) => {
        this.form.patchValue(resp.body);
        this.employee = {
          label: resp.body.employee,
          value: resp.body.employeeId,
        };
        this.tool = {
          label: resp.body.tool,
          value: resp.body.toolId,
        };
      });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      employeeId: this.employee.value,
    });
    this.form.patchValue({
      toolId: this.tool.value,
    });

    this.id = this.config.data.id;
    if (this.id === 0) {
      this.dataSerivce
        .post(`ControlPrestamoHerramientas`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Registro creado');
          },
          (err) => {
            console.log(err.error);
          }
        );
    } else {
      this.dataSerivce
        .put(`ControlPrestamoHerramientas/${this.id}`, this.form.value)
        .subscribe(
          (resp) => {
            this.ref.close('Actualizado Correctamente');
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }

  get fechaSalida() {
    return this.form.value('fechaSalida');
  }
  get fechaRegreso() {
    return this.form.value('fechaRegreso');
  }
  get employeeId() {
    return this.form.value('employeeId');
  }
  get toolId() {
    return this.form.value('toolId');
  }
  get observaciones() {
    return this.form.value('observaciones');
  }
}
