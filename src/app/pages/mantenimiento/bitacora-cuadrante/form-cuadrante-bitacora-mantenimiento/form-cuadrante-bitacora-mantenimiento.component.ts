import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-form-cuadrante-bitacora-mantenimiento',
  templateUrl: './form-cuadrante-bitacora-mantenimiento.component.html',
})
export class FormCuadranteBitacoraMantenimientoComponent implements OnInit {
  customerId = 0;
  userId = '';
  form: FormGroup;
  equipoId;
  checked: boolean = false;
  formFecha: FormGroup;
  equipo: any;

  constructor(
    private selectListService: SelectlistService,
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.customerId = this.authService.customerAuthId;
    this.equipoId = this.config.data.equipoId;
    this.userId = this.authService.InfoUserAuthDto.id;
    this.onLoadMachinery();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customerId: [this.customerId, Validators.required],
      machineryId: [this.equipoId, Validators.required],
      descripcion: ['', Validators.required],
      emergencia: [false],
      applicationUserId: [this.userId, Validators.required],
    });

    this.formFecha = this.formBuilder.group({
      fechaHora: [],
    });
  }

  onSubmit() {
    this.dataService.post(`BitacoraMantenimiento`, this.form.value).subscribe(
      (resp: any) => {
        this.ref.close('Guardado');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  onLoadMachinery() {
    this.dataService.get(`Machineries/${this.equipoId}`).subscribe(
      (resp: any) => {
        this.equipo = resp.body;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  get machineryId() {
    return this.form.get('machineryId');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
}
