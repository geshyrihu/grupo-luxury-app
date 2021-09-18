import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';

@Component({
  selector: 'app-add-equipos-bitacora-cuadrante',
  templateUrl: './add-equipos-bitacora-cuadrante.component.html',
  providers: [MessageService],
})
export class AddEquiposBitacoraCuadranteComponent implements OnInit {
  customerId;
  form: FormGroup;
  bitacoraCuadranteId: number = 0;
  maquinarias: any[] = [];
  maquinaria: any = {};
  results: any[];
  checked: boolean = false;
  constructor(
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    public config: DynamicDialogConfig,
    private authService: AuthService,
    public messageService: MessageService
  ) {
    this.bitacoraCuadranteId = this.config.data.bitacoraCuadranteId;
    this.customerId = this.authService.customerAuthId;
    this.onLoadMachinery();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
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

  onSubmit(): void {
    this.form.patchValue({
      id: this.maquinaria.id,
    });
    if (this.form.invalid) {
      return;
    }

    this.dataService
      .post(
        `BitacoraCuadrantes/AddEquipos/${this.bitacoraCuadranteId}`,
        this.form.value
      )
      .subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', 'Guardado');
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
