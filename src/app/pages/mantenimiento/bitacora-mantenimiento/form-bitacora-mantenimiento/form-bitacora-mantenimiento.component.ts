import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { DataService } from 'src/app/shared/services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-bitacora-mantenimiento',
  templateUrl: './form-bitacora-mantenimiento.component.html',
})
export class FormBitacoraMantenimientoComponent implements OnInit {
  customerId = 0;
  userId = '';
  form: FormGroup;
  maquinarias: any[] = [];
  maquinaria: any = {};
  results: any[];
  checked: boolean = false;
  formFecha: FormGroup;

  constructor(
    private selectListService: SelectlistService,
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) {
    this.customerId = this.authService.customerAuthId;
    this.userId = this.authService.InfoUserAuthDto.id;
    this.onLoadMachinery();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      customerId: [this.customerId, Validators.required],
      machineryId: ['', Validators.required],
      descripcion: ['', Validators.required],
      emergencia: [false],
      applicationUserId: [this.userId, Validators.required],
    });

    this.formFecha = this.formBuilder.group({
      fechaHora: [],
    });
  }

  FiltrarMaquinaria(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.maquinarias.length; i++) {
      let country = this.maquinarias[i];
      if (
        country.nameMachinery.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  }

  onSubmit() {
    this.form.patchValue({
      machineryId: this.maquinaria.id,
    });
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
    this.dataService
      .get(`ComboBox/ListadoInstalaciones/${this.customerId}`)
      .subscribe(
        (resp: any) => {
          this.maquinarias = resp.body;
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
